// dist ディレクトリ内で appsscript.json 以外を削除するスクリプト
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const keepFile = 'appsscript.json';

fs.readdirSync(distDir).forEach(file => {
  if (file !== keepFile) {
    const target = path.join(distDir, file);
    if (fs.lstatSync(target).isDirectory()) {
      fs.rmSync(target, { recursive: true, force: true });
    } else {
      fs.unlinkSync(target);
    }
  }
});
console.log('dist ディレクトリのクリーン完了 (appsscript.json を除く)');
