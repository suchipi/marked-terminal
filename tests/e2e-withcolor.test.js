process.env.FORCE_COLOR = 3;

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { describe, it, expect } from 'vitest';
import Renderer from '../index.js';
import marked from './_marked.js';
import { fileURLToPath } from 'url';

function getFixtureFile(fileName) {
  return readFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), 'fixtures/', fileName),
    { encoding: 'utf8' }
  );
}

function markup(str) {
  var r = new Renderer();
  return marked(str, { renderer: r });
}

describe('e2e', function () {
  it('should render a document full of different supported syntax', function () {
    const actual = markup(getFixtureFile('e2e.md'));
    expect(actual).toMatchSnapshot();
  });
});
