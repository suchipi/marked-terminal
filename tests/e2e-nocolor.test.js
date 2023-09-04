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

var opts = [
  'code',
  'blockquote',
  'html',
  'heading',
  'firstHeading',
  'hr',
  'listitem',
  'table',
  'paragraph',
  'strong',
  'em',
  'codespan',
  'del',
  'link',
  'href'
];

var defaultOptions = {};
opts.forEach(function (opt) {
  defaultOptions[opt] = (x) => x;
});

function markup(str) {
  var r = new Renderer(defaultOptions);
  return stripTermEsc(marked(str, { renderer: r }));
}

describe('e2e', function () {
  it('should render a document full of different supported syntax', function () {
    const actual = markup(getFixtureFile('e2e.md'));
    expect(actual).toMatchSnapshot();
  });
});
