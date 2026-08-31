# Security Policy / セキュリティポリシー

## 脆弱性の報告 / Reporting a Vulnerability

freee-mcp に脆弱性を発見した場合は、公開の Issue や Pull Request、公開のコメントには書かず、
非公開の経路でご連絡ください。

- 第一の窓口: このリポジトリの [Security タブ](https://github.com/freee/freee-mcp/security/advisories/new) から
  「Report a vulnerability」で報告してください（GitHub Private Vulnerability Reporting）。
  報告内容はメンテナーにのみ表示され、修正が公開されるまで非公開のまま扱われます。
- 上記が利用できない場合: [IPA の脆弱性関連情報の届出](https://www.ipa.go.jp/security/todokede/vuln/index.html)
  をご利用ください。freee は JPCERT/CC 経由で脆弱性情報を受け取り、都度対応しています。

報告に含めていただきたい情報:

- 影響を受けるバージョン（`freee_server_info` の出力、または npm パッケージのバージョン）
- 動作モード（ローカルの stdio モード / リモートモード）
- 再現手順と、想定される影響範囲

再現手順に認証情報や実データを含めないでください。アクセストークン、リフレッシュトークン、
認可コード、client secret、事業所の実データなどはすべてダミー値に置き換えてください。
実際に漏洩した認証情報を報告に含める必要はありません。該当する場合は、その事実だけを記載し、
値そのものは送らないでください。

If you believe you have found a security vulnerability in freee-mcp, please do not open a public
issue, pull request or comment. Report it privately through
[Report a vulnerability](https://github.com/freee/freee-mcp/security/advisories/new) on this
repository's Security tab, which is visible only to the maintainers. If that is unavailable, you can
use [IPA's vulnerability reporting scheme](https://www.ipa.go.jp/security/todokede/vuln/index.html);
freee receives vulnerability information via JPCERT/CC. Include the affected version, the mode
(local stdio or remote), reproduction steps and the expected impact, and replace every credential
and every piece of real business data with dummy values.

## 対応の流れ / What to Expect

- 受領の確認をお返しします。調査の結果と対応方針は、報告いただいた同じ非公開スレッドでお知らせします。
- 修正が必要と判断した場合は、修正のリリース後に GitHub Security Advisory として公開します。
- 現時点で報奨金プログラム（bug bounty）は提供していません。

We will acknowledge your report, share the outcome of our investigation in the same private thread,
and publish a GitHub Security Advisory once a fix has been released. We do not currently operate a
bug bounty program.

## 脆弱性ではない報告 / Reports That Are Not Vulnerabilities

自動スキャナや静的解析ツールの出力そのもの、確認済みの脆弱性を含まない監査レポート、
セキュリティ設計についての一般的な質問は、非公開の窓口ではなく通常の
[Issue](https://github.com/freee/freee-mcp/issues/new/choose) にお寄せください。
その際も、上記と同じ理由でトークン・実データ・内部情報は記載しないでください。

なお、freee-mcp は Issue ベースのコントリビューションを採用しており、外部からの Pull Request は
受け付けていません。詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

Automated scanner output, audit reports that contain no confirmed vulnerability, and general
questions about the security design belong in a regular
[issue](https://github.com/freee/freee-mcp/issues/new/choose) rather than the private channel. The
same rule about credentials, real business data and internal information applies there. Note that
freee-mcp takes issue-based contributions only and does not accept external pull requests; see
[CONTRIBUTING.md](./CONTRIBUTING.md).

## 対象範囲 / Scope

このポリシーは freee-mcp（このリポジトリのコードおよび npm パッケージ）を対象とします。
freee のサービス本体や freee API 自体の脆弱性については、freee の窓口を通じてご報告ください。

This policy covers freee-mcp: the code in this repository and the published npm package.
Vulnerabilities in freee's services or in the freee API itself should be reported through freee's
own channels.
