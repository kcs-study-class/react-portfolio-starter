# React ポートフォリオ スターターキット
### 専門学校生向け：ゲーム・クリエイター業界向けポートフォリオ制作教材

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7.15-CA4245?logo=reactrouter&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A520-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 ライブデモ

**[https://portfolio-starter.kitsune-cs.dev/](https://portfolio-starter.kitsune-cs.dev/)** で公開中です。  
ブラウザで開いて、完成形の見た目・動作を確認してから学習を始められます。

---

## このリポジトリについて

専門学校のゲームクリエイター科・Web科の学生が、React を使ってポートフォリオサイトをゼロから作るための**実装済みサンプル＋学習ドキュメント**です。

## 動作確認

```bash
npm install
npm run dev
```

`http://localhost:5173` で確認できます。

## 学習ドキュメント

ドキュメントの順番通りに進めると、ポートフォリオをゼロから作れます。

| ドキュメント | 内容 |
|-------------|------|
| [01 ポートフォリオとは](./docs/01_intro.md) | 採用担当者が見るポイント・スキルの書き方 |
| [02 環境構築とプロジェクト作成](./docs/02_setup.md) | Node.js・Vite・CSS変数の設定 |
| [03 Reactの基礎知識](./docs/03_react_basics.md) | コンポーネント・Props・useState・カスタムフック |
| [04 データ設計](./docs/04_data_design.md) | portfolio.ts の構造と各フィールドの書き方 |
| [05 コンポーネントを作る](./docs/05_components.md) | App〜各セクション・詳細ページの実装手順 |
| [06 ReactとVueの比較](./docs/06_vue_comparison.md) | 同じ機能をVueで書くとどうなるか |
| [07 デプロイ](./docs/07_deployment.md) | Vercel / GitHub Pages で公開する手順 |

## 技術スタック

- **React 19** — UIフレームワーク
- **TypeScript 6** — 型安全な開発（strict モード）
- **React Router v7** — ページルーティング
- **Vite 8** — 開発環境・ビルドツール
- **CSS Variables** — ダーク/ライトテーマ管理（CSSフレームワーク不使用）

## ライセンス

MIT — 自由に使って、改変して、自分のポートフォリオとして公開してください。
