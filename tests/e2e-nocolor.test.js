process.env.FORCE_COLOR = 0;

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { describe, it, expect } from 'vitest';
import Renderer from '../index.js';
import marked from './_marked.js';
import { fileURLToPath } from 'url';

function stripTermEsc(str) {
  return str.replace(/\u001b\[\d{1,2}m/g, '');
}

function getFixtureFile(fileName) {
  return readFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), 'fixtures/', fileName),
    { encoding: 'utf8' }
  );
}

function identity(x) {
  return x;
}

function markup(str) {
  var r = new Renderer({
    code: identity,
    blockquote: identity,
    html: identity,
    heading: identity,
    firstHeading: identity,
    hr: identity,
    listitem: identity,
    table: identity,
    paragraph: identity,
    strong: identity,
    em: identity,
    codespan: identity,
    del: identity,
    link: identity,
    href: identity
  });
  return stripTermEsc(marked(str, { renderer: r }));
}

describe('e2e', function () {
  it('should render a document full of different supported syntax', function () {
    const actual = markup(getFixtureFile('e2e.md'));
    expect(actual).toMatchSnapshot();
  });
});
