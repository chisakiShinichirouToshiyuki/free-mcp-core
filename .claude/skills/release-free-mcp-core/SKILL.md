---
name: release-free-mcp-core
description: free-mcp-core（freee/freee-mcp の fork）で、upstream 同期 PR のレビュー・マージと npm リリース（changesets）を行う手順。「upstream に揃える PR が来た」「npm publish して」「リリースして」「新しいバージョンを出して」と言われたときに使う。
---

# free-mcp-core の upstream 同期とリリース

このリポジトリは freee/freee-mcp の fork で、npm には `free-mcp-core` として公開している。
リリースは `.github/workflows/release.yml`（changesets/action + npm Trusted Publishing）で行い、ローカルから `npm publish` はしない。
upstream 由来の `.github/workflows/publish.yml` は手動実行専用で、この fork では使わない。

## 前提と落とし穴

- `gh` のデフォルトリポジトリが upstream（freee/freee-mcp）を向いていることがある。fork 側の操作には必ず `--repo` を付ける
  - `R=$(git remote get-url origin | sed -E 's#.*github.com[/:]##; s#\.git$##')`
- main のブランチ保護: `required_linear_history` が有効で merge commit 不可。マージは常に squash
- 必須チェック: `lint`, `unit-test`, `e2e-test`, `build`, `Analyze (javascript-typescript)`（CodeQL）
- public リポジトリでも 60 日コミットがないとスケジュール付きワークフローは `disabled_inactivity` で自動無効化される。CodeQL が PR で起動しないときはまず確認する
  - `gh api repos/$R/actions/workflows -q '.workflows[]|{name,state}'`
  - 無効なら `gh workflow enable codeql.yml --repo $R` の後、PR を close → reopen して再トリガー
- フォークからの PR は CI が `action_required`（承認待ち）になる。内容を確認してから承認する
  - `gh run list --repo $R --status action_required` → `gh api -X POST repos/$R/actions/runs/<id>/approve`
- `RELEASE_PAT`（changesets/action がブランチを push し PR を作るためのトークン）は期限切れになる。症状と対処:
  - Checkout で `could not read Username` → 期限切れ
  - push で `403` → 権限不足。fine-grained なら Contents と Pull requests を Read and write、classic なら `repo` スコープ
  - 更新はユーザーに `! gh secret set RELEASE_PAT --repo <owner/repo>` を実行してもらう（トークンを会話に貼らせない）

## 1. upstream 同期 PR のレビュー

upstream の変更は数万行になるので、行単位ではなく「upstream タグとの差分が fork 固有部分だけか」で判定する。

1. PR を取得: `git fetch origin pull/<N>/head:pr-<N>` と `git fetch upstream --tags`
2. マージコミットの第 2 親が upstream の正規タグと一致するか確認
   - `git cat-file -p pr-<N> | grep parent` と `git rev-parse v<X.Y.Z>^{commit}`
3. upstream タグとの差分が fork 固有ファイルだけか確認: `git diff --stat v<X.Y.Z> pr-<N>`
   - 想定される fork 固有ファイル: `package.json`（name / version / main / types / exports / forkedFrom）、`README.md`、`CHANGELOG.md`、`NOTICE`、`SECURITY.md`、`build.ts`、`src/lib.ts`、`src/skills-path.ts`、`src/mcp/skill-resources.ts`、`src/cli/skills.ts`、`src/cli/host-package.ts`、`.github/workflows/release.yml`、`.github/workflows/claude-code-review.yml`、`.github/workflows/codeql.yml`、`.github/codeql/`、`.changeset/`
   - これ以外に差分があれば中身を必ず読む（upstream に無いコードの混入はサプライチェーン上の危険）
4. fork 固有部分が main から意図どおり変わっているか確認: `git diff origin/main pr-<N> -- $(git diff --name-only v<X.Y.Z> pr-<N>)`
5. ローカル検証（worktree をスクラッチに作る）: `bun install --frozen-lockfile && bun run typecheck && bun run lint && bun run test:run && bun run build`
6. changeset（`"free-mcp-core": minor` など）が含まれていることを確認

## 2. マージ

- `gh pr merge <N> --repo $R --squash --match-head-commit <sha> --subject "chore: sync upstream freee/freee-mcp v<X.Y.Z> (#<N>)"`
- フォーク PR で必須チェックがどうしても起動しない場合は、同じコミットを origin のブランチに push して同一リポジトリ PR として出し直し、元 PR にはコメントしてクローズする。squash の body に `Co-authored-by:` で元の作者を残す

## 3. リリース

main に未消化の changeset が入ると、`release.yml` が自動で「chore: release packages」PR（`changeset-release/main`）を作る。

1. リリース PR が作られたか確認: `gh pr list --repo $R --head changeset-release/main`
   - 作られない場合は `gh run list --repo $R --workflow release.yml` で失敗ログを見る（多くは `RELEASE_PAT`）
2. リリース PR の差分がバージョン・CHANGELOG・changeset 削除だけであることを確認し、必須チェック通過後に squash マージ
3. マージの push で `release.yml` が再度走り、`changeset publish` で npm に公開される。起動しなかった場合は `gh workflow run release.yml --repo $R --ref main`
4. 公開確認: `npm view free-mcp-core dist-tags --json` と `git ls-remote --tags origin | grep v<version>`

## 補足

- `.changeset/config.json` は `"commit": false` にしておく。`true` だと `changeset version` が `[skip ci]` 付きコミットを作り、リリース PR の CI もマージ後の publish も起動しなくなる（upstream 同期でここが `true` に戻っていないか確認する）
- パッケージを変えない変更（CI・ドキュメントなど）には空の changeset（frontmatter が `---` だけ）を置けばバージョンは上がらない
