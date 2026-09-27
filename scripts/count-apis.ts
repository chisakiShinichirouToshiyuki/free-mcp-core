#!/usr/bin/env bun

/**
 * Count operations/paths across all OpenAPI schemas in `openapi/`.
 * Replaces the manual tally that used to be run by hand and pasted into Slack.
 */

import { readdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const OPENAPI_DIR = join(PROJECT_ROOT, 'openapi');

const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const;
type HttpMethod = (typeof HTTP_METHODS)[number];

interface OpenAPISchema {
  info?: { title?: string };
  paths?: Record<string, Record<string, unknown>>;
}

export interface ApiCount {
  file: string;
  title: string;
  methods: Record<HttpMethod, number>;
  operations: number;
  paths: number;
}

export interface Totals {
  apis: number;
  paths: number;
  operations: number;
  methods: Record<HttpMethod, number>;
}

/** Schema files that make up the countable API surface (excludes `minimal/` and `tag-mappings.json`). */
export function listSchemaFiles(dir: string): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith('-api-schema.json'))
    .sort();
}

export function countSchema(file: string, schema: OpenAPISchema): ApiCount {
  const methods: Record<HttpMethod, number> = { get: 0, post: 0, put: 0, delete: 0, patch: 0 };
  const paths = schema.paths ?? {};
  for (const operations of Object.values(paths)) {
    for (const method of HTTP_METHODS) {
      if (method in operations) methods[method]++;
    }
  }
  const operationCount = HTTP_METHODS.reduce((sum, m) => sum + methods[m], 0);
  return {
    file,
    title: schema.info?.title ?? file,
    methods,
    operations: operationCount,
    paths: Object.keys(paths).length,
  };
}

export function totalize(counts: ApiCount[]): Totals {
  const methods: Record<HttpMethod, number> = { get: 0, post: 0, put: 0, delete: 0, patch: 0 };
  let paths = 0;
  let operations = 0;
  for (const c of counts) {
    for (const m of HTTP_METHODS) methods[m] += c.methods[m];
    paths += c.paths;
    operations += c.operations;
  }
  return { apis: counts.length, paths, operations, methods };
}

function formatTable(headers: string[], rows: string[][]): string {
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => r[i]?.length ?? 0)));
  const line = (cells: string[]) => `| ${cells.map((c, i) => c.padEnd(widths[i])).join(' | ')} |`;
  const separator = `| ${widths.map((w) => '-'.repeat(w)).join(' | ')} |`;
  return [line(headers), separator, ...rows.map(line)].join('\n');
}

function printReport(counts: ApiCount[], totals: Totals): void {
  console.log(
    `API 数: ${totals.apis} / パス数: ${totals.paths} / 操作数(合計): ${totals.operations}`,
  );
  console.log('');

  console.log('HTTP メソッド別');
  console.log(
    formatTable(
      ['メソッド', '操作数'],
      [
        ...HTTP_METHODS.map((m) => [m.toUpperCase(), String(totals.methods[m])]),
        ['合計', String(totals.operations)],
      ],
    ),
  );
  console.log('');

  console.log('API サービス別内訳');
  const sorted = [...counts].sort((a, b) => b.operations - a.operations);
  console.log(
    formatTable(
      ['API', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', '合計', 'パス数'],
      sorted.map((c) => [
        c.title,
        String(c.methods.get),
        String(c.methods.post),
        String(c.methods.put),
        String(c.methods.delete),
        String(c.methods.patch),
        String(c.operations),
        String(c.paths),
      ]),
    ),
  );
}

export function analyze(dir: string = OPENAPI_DIR): { counts: ApiCount[]; totals: Totals } {
  const counts = listSchemaFiles(dir).map((file) => {
    const schema: OpenAPISchema = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
    return countSchema(file, schema);
  });
  return { counts, totals: totalize(counts) };
}

function main(): void {
  const asJson = process.argv.includes('--json');
  const { counts, totals } = analyze();

  if (asJson) {
    console.log(JSON.stringify({ counts, totals }, null, 2));
  } else {
    printReport(counts, totals);
  }
}

if (import.meta.main) {
  main();
}
