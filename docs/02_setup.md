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
├── data/           ← ポートフォリオのデータ
└── styles/         ← CSS（セクション別に分割して管理）
```

ターミナルで一括作成できます。

```bash
mkdir src/components src/pages src/hooks src/data src/styles
```

---

## React Router のインストール

複数ページ（トップページ・作品詳細ページ）を作るために必要です。

```bash
npm install react-router-dom
```

---

## `tsconfig.json` について

`npm create vite` で TypeScript を選ぶと、TypeScript の設定ファイル `tsconfig.json` がプロジェクト直下に自動生成されます。  
基本的に **触らなくて問題ありません** が、何が書かれているかは知っておきましょう。

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

**主要な設定の意味**:

| 設定 | 意味 |
|------|------|
| `"target": "ES2020"` | コンパイル後の JavaScript のバージョン |
| `"jsx": "react-jsx"` | `.tsx` 内の TSX 構文を React 17+ の新しい変換方式で処理する（`import React` が不要になる）。設定キー名の `jsx` は TypeScript の仕様上の名称で、TSX も同じオプションで処理されます |
| `"strict": true` | **すべての厳格チェックを有効化**。`null` 安全性や暗黙の `any` を禁止し、バグを未然に防ぐ |
| `"noEmit": true` | ビルドは Vite が行うので、TypeScript は型チェックだけ担当する |
| `"isolatedModules": true` | 1ファイルずつ独立してコンパイルできることを保証（Vite が要求） |
| `"include": ["src"]` | `src` フォルダ配下のファイルだけを型チェック対象にする |

> **`strict: true` は最初こそ厳しく感じますが、学生のうちから慣れておくべき設定です。**  
> `null` チェック忘れ・型不一致を **コンパイル時に発見できる** ので、実行時にエラーで落ちる前にエディタが教えてくれます。

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

## `index.html` の完成形

`<title>` を自分の名前に変更し、フォント読み込みも追加した最終形です。  
Vite がプロジェクト直下に作った `index.html` を以下の内容に置き換えてください。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>山田太郎 Portfolio</title>

    <!-- Google Fonts（Noto Sans JP / Space Grotesk） -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Space+Grotesk:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**ポイント**:
- `<title>` は自分の名前に変更してください（ブラウザのタブに表示されます）
- `<div id="root">` が React のレンダリング先です。`main.tsx` がこの要素を `getElementById('root')` で掴みます
- `<script type="module" src="/src/main.tsx">` がアプリのエントリーポイント。`type="module"` で ES Modules として読み込みます
- フォントの `preconnect` は接続を先行確立しておく最適化です（読み込みが少し速くなる）

---

## CSS をセクション別に分割する

CSS は **1ファイルにまとめると 1500 行を超えて読みづらく** なるので、`src/styles/` 配下にセクションごとに分割します。  
`src/index.css` は **`@import` で各ファイルをまとめるだけ** の集約ファイルにします。

### ファイル構成

```
src/
├── index.css           ← @import で styles/ 配下を読み込む集約ファイル
└── styles/
    ├── base.css          ← リセット・CSS変数・html/body/リンク/画像
    ├── utilities.css     ← .container / .section / .btn / .tag（共通ユーティリティ）
    ├── header.css        ← Header コンポーネント
    ├── hero.css          ← Hero コンポーネント + .avatar-placeholder
    ├── about.css         ← About コンポーネント（タイムライン含む）
    ├── skills.css        ← Skills コンポーネント
    ├── works.css         ← Works 一覧
    ├── gamejams.css      ← GameJams コンポーネント
    ├── certifications.css ← Certifications コンポーネント
    ├── contact.css       ← Contact コンポーネント
    ├── footer.css        ← フッター
    ├── work-detail.css   ← WorkDetail ページ
    └── responsive.css    ← @media (max-width: 768px) 共通レスポンシブ
```

### `src/index.css`（集約ファイル）

```css
@import './styles/base.css';
@import './styles/utilities.css';

@import './styles/header.css';
@import './styles/hero.css';
@import './styles/about.css';
@import './styles/skills.css';
@import './styles/works.css';
@import './styles/gamejams.css';
@import './styles/certifications.css';
@import './styles/contact.css';
@import './styles/footer.css';

@import './styles/work-detail.css';

@import './styles/responsive.css';
```

**ポイント**:
- **読み込み順は重要** — `base.css`（変数定義）を最初に、`responsive.css`（オーバーライド）を最後に置きます。CSS は **後に書かれた方が勝つ** ルールなので、レスポンシブのメディアクエリは最後でないと打ち消されません
- Vite は `@import` をビルド時に **1ファイルに結合** してくれるので、本番環境で HTTP リクエストが増える心配はありません
- 開発時もファイル単位でホットリロードが効くので、編集→確認のサイクルが速くなります

### `base.css`（基礎スタイル抜粋）

`base.css` には CSS変数・リセット・テーマ定義が入ります。色や角丸を変えたいときはここを編集します。

```css
/* リセット */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* CSS変数（ダークテーマ・デフォルト） */
:root {
  --color-bg: #0d0d14;
  --color-surface: #16161f;
  --color-accent: #7c6af7;       /* ← ここを変えると全体のアクセントカラーが変わる */
  --color-accent-2: #f76ac8;
  --color-text: #e8e8f0;
  --color-text-muted: #8888aa;
  --font-en: 'Space Grotesk', sans-serif;
  --font-ja: 'Noto Sans JP', sans-serif;
  --radius: 12px;
  --transition: 0.3s ease;
  /* ...省略 */
}

/* CSS変数（ライトテーマ） */
[data-theme="light"] {
  --color-bg: #f4f4f8;
  --color-text: #1a1a2e;
  /* ...省略 */
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-ja);
  line-height: 1.7;
}
```

**ポイント**: `:root` にダークテーマ、`[data-theme="light"]` にライトテーマを定義することで、  
`document.documentElement.setAttribute('data-theme', 'light')` を実行するだけで全体のテーマが切り替わります。

---

## 残りの CSS（各コンポーネントのスタイル）について

各セクションの CSS（合計 **約 1500 行**）はこのドキュメントに全部貼ると逆に読みにくいので、以下の方針を推奨します。

> **CSS は完成版をそのまま使ってください**
>
> 1. このリポジトリの `src/index.css` と `src/styles/` 配下を **そのままコピー** して使う
> 2. 色・角丸・フォントを変えたいときは `src/styles/base.css` の CSS 変数を編集する
> 3. 各クラスの役割を調べたいときは [CSS リファレンス](./css.md) を参照する
> 4. 特定セクションだけ調整したいときは `src/styles/<該当セクション>.css` を編集する

**「動くものを作ってから」CSS を理解する** 順番でも遅くありません。

---

## 次のステップ

→ [第3章：Reactの基礎知識](./03_react_basics.md)
