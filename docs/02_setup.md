# 第2章：環境構築とプロジェクト作成

## 必要なツールのインストール

| ツール | 用途 | インストール先 |
|--------|------|---------------|
| Node.js v20以上 | JavaScriptの実行環境 | https://nodejs.org |
| VS Code | コードエディタ | https://code.visualstudio.com |
| Git | バージョン管理 | https://git-scm.com |

インストール後、ターミナルで確認します。

```bash
node -v   # v20.x.x と表示されればOK
git -v    # git version 2.x.x と表示されればOK
```

---

## VS Code の推奨拡張機能

| 拡張機能 | 用途 |
|---------|------|
| ES7+ React/Redux/React-Native snippets | Reactのスニペット補完 |
| Prettier | コード整形 |
| GitLens | Git履歴の可視化 |

---

## プロジェクトを作成する

```bash
# Vite + React + TypeScript のプロジェクトを作成
npm create vite@latest my-portfolio

# プロジェクトフォルダに移動
cd my-portfolio

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

コマンドを実行すると対話式のメニューが表示されます。

```
? Select a framework: › React
? Select a variant: › TypeScript + React Compiler
```

**React Compiler とは？**  
React 19 で導入された自動最適化機能です。`useMemo` / `useCallback` / `memo` を手動で書かなくても、コンパイル時にパフォーマンス最適化を自動で行ってくれます。

> **Note**: `-- --template react-ts` のようにフラグで指定する方法は、create-vite v6以降では正しく動作しないことがあります。対話式メニューから選択する方法が確実です。

ブラウザで `http://localhost:5173` を開くとデモ画面が表示されます。

---

## 初期ファイルの整理

Viteが生成したサンプルコードを削除して白紙の状態にします。

**削除するファイル**
```
src/App.css
src/assets/react.svg
src/assets/vite.svg
```

**`src/App.tsx` を以下に書き換える**

```tsx
export default function App() {
  return (
    <div>
      <h1>My Portfolio</h1>
    </div>
  )
}
```

**`src/index.css` の中身をすべて削除する**（後で自分で書きます）

---

## フォルダ構成を作る

以下のフォルダを `src/` の中に作成します。

```
src/
├── components/     ← 各セクションのコンポーネント
├── pages/          ← ページコンポーネント（作品詳細ページ）
├── hooks/          ← カスタムフック（テーマ切替など）
└── data/           ← ポートフォリオのデータ
```

ターミナルで一括作成できます。

```bash
mkdir src/components src/pages src/hooks src/data
```

---

## React Router のインストール

複数ページ（トップページ・作品詳細ページ）を作るために必要です。

```bash
npm install react-router-dom
```

---

## `src/main.tsx` を更新する

`BrowserRouter` でアプリ全体を囲みます。

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**ポイント**: `getElementById('root')!` の `!` は「絶対 null にならない」とTypeScriptに伝えるための記法（非 null アサーション）です。

---

## `index.html` のタイトルを変更する

```html
<title>山田太郎 Portfolio</title>
```

自分の名前に変更してください。

---

## フォントを読み込む（任意）

`index.html` の `<head>` 内に追加します。

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Space+Grotesk:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

---

## CSS変数を設定する

`src/index.css` にデザイントークンを定義します。  
全コンポーネントで共通の色・フォント・サイズを使えるようになります。

```css
/* ===========================
   リセット
   すべての要素のデフォルトの余白をゼロにする
   box-sizing: border-box でpadding・borderをwidth/heightに含める
   =========================== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ===========================
   CSS変数（ダークテーマ・デフォルト）
   :root に定義した変数はページ全体で使える
   =========================== */
:root {
  --color-bg: #0d0d14;         /* ページ背景色 */
  --color-surface: #16161f;    /* カード・セクションの背景色 */
  --color-surface-2: #1e1e2e;  /* カード内の入れ子要素などの背景色 */
  --color-border: #2a2a3d;     /* ボーダー・区切り線の色 */
  --color-accent: #7c6af7;     /* メインアクセントカラー（紫） */
  --color-accent-2: #f76ac8;   /* サブアクセントカラー（ピンク） */
  --color-text: #e8e8f0;       /* 本文テキストの色 */
  --color-text-muted: #8888aa; /* 補足テキスト・ラベルなど薄い文字色 */
  --font-en: 'Space Grotesk', sans-serif; /* 英字フォント */
  --font-ja: 'Noto Sans JP', sans-serif;  /* 日本語フォント */
  --radius: 12px;              /* カードなどの角丸の大きさ */
  --transition: 0.3s ease;     /* ホバーアニメーションの速さ */
}

/* ===========================
   CSS変数（ライトテーマ）
   data-theme="light" が <html> に付いたとき上書きされる
   =========================== */
[data-theme="light"] {
  --color-bg: #f4f4f8;
  --color-surface: #ffffff;
  --color-surface-2: #ebebf3;
  --color-border: #d8d8e8;
  --color-accent: #6a58e8;
  --color-accent-2: #e855b4;
  --color-text: #1a1a2e;
  --color-text-muted: #666680;
}

/* ===========================
   html
   =========================== */
html {
  scroll-behavior: smooth; /* アンカーリンクをなめらかにスクロールする */
}

/* ===========================
   body（ページ全体の基本スタイル）
   =========================== */
body {
  background-color: var(--color-bg);   /* 背景色をCSS変数から取得 */
  color: var(--color-text);            /* 文字色をCSS変数から取得 */
  font-family: var(--font-ja);         /* フォントをCSS変数から取得 */
  line-height: 1.7;                    /* 行間を広めに取り読みやすくする */
  -webkit-font-smoothing: antialiased; /* macOSでフォントをなめらかに描画する */
}
```

**ポイント**: `:root` にダークテーマ、`[data-theme="light"]` にライトテーマを定義することで、  
`document.documentElement.setAttribute('data-theme', 'light')` を実行するだけで全体のテーマが切り替わります。

---

## 次のステップ

→ [第3章：Reactの基礎知識](./03_react_basics.md)
