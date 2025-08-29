## 使用技術
- TypeScript
- Google Apps Script
- pnpm
- dotenv
- clasp
- Node.js

## 環境変数の設定

1. プロジェクトルートに `.env` ファイルを作成し、以下の内容を記載してください。
   （`.env.example` を参考にできます）

```
GAS_SCRIPT_ID=your-script-id
GAS_PARENT_ID=your-parent-id
```

2. `.env` は `.gitignore` で管理されているため、リポジトリには含まれません。

## 依存パッケージのインストール

```
pnpm install
```

## .clasp.json の自動生成

`.clasp.json` は環境変数から自動生成されます。

```
pnpm env:clasp
```

## ビルド

TypeScript から Google Apps Script 用にビルドします。

```
pnpm build
```

## デプロイ

Google Apps Script へのデプロイは以下のコマンドで行います。

```
pnpm deploy:gas
```

- `build` → `push` → `clasp open` をまとめて実行します。


## 参考

- `.env.example` を参考に環境変数を設定してください。
- `scripts/generate-clasp-json.js` で `.clasp.json` を自動生成します。
