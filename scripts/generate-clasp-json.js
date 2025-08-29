// scripts/generate-clasp-json.js
// .env から GAS_SCRIPT_ID, GAS_PARENT_ID を読み込んで .clasp.json を生成
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const scriptId = process.env.GAS_SCRIPT_ID || '';
const parentId = process.env.GAS_PARENT_ID || '';
const rootDir = './dist';

const claspConfig = {
  scriptId,
  parentId,
  rootDir
};

const outPath = path.resolve(__dirname, '../.clasp.json');
fs.writeFileSync(outPath, JSON.stringify(claspConfig, null, 2));
console.log('.clasp.json generated!');
