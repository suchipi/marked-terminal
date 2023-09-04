#!/usr/bin/env node
import * as fs from 'fs';
import Renderer from '../index.js';
import marked from './_marked.js';

function markup(str) {
  var r = new Renderer();
  return marked(str, { renderer: r });
}

const inputFile = process.argv[2];
const content = fs.readFileSync(inputFile, 'utf-8');
const outputContent = markup(content);

console.log(outputContent);
