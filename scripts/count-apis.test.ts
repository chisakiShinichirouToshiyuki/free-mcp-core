import { describe, expect, it } from 'vitest';
import { countSchema, totalize } from './count-apis';

describe('countSchema', () => {
  it('counts operations per HTTP method and total paths', () => {
    const schema = {
      info: { title: 'Example API' },
      paths: {
        '/items': { get: {}, post: {} },
        '/items/{id}': { get: {}, put: {}, delete: {} },
        '/items/{id}/archive': { patch: {} },
      },
    };

    const result = countSchema('example-api-schema.json', schema);

    expect(result.methods).toEqual({ get: 2, post: 1, put: 1, delete: 1, patch: 1 });
    expect(result.operations).toBe(6);
    expect(result.paths).toBe(3);
    expect(result.title).toBe('Example API');
  });

  it('falls back to the filename when info.title is missing', () => {
    const result = countSchema('untitled-api-schema.json', { paths: {} });
    expect(result.title).toBe('untitled-api-schema.json');
    expect(result.operations).toBe(0);
    expect(result.paths).toBe(0);
  });

  it('ignores non-HTTP-method keys on a path item (e.g. shared parameters)', () => {
    const schema = {
      paths: {
        '/items/{id}': { parameters: [{ name: 'id' }], get: {} },
      },
    };

    const result = countSchema('example-api-schema.json', schema);
    expect(result.methods.get).toBe(1);
    expect(result.operations).toBe(1);
  });
});

describe('totalize', () => {
  it('sums operations, paths and per-method counts across schemas', () => {
    const a = countSchema('a-api-schema.json', { paths: { '/a': { get: {} } } });
    const b = countSchema('b-api-schema.json', { paths: { '/b': { get: {}, post: {} } } });

    const totals = totalize([a, b]);

    expect(totals.apis).toBe(2);
    expect(totals.paths).toBe(2);
    expect(totals.operations).toBe(3);
    expect(totals.methods).toEqual({ get: 2, post: 1, put: 0, delete: 0, patch: 0 });
  });
});
