# 第7章：デプロイ（インターネットに公開する）

ポートフォリオは **URL を共有できる状態** にして初めて意味を持ちます。

---

## 公開前チェックリスト

- [ ] `index.html` の `<title>` を自分の名前に変更した
- [ ] `src/data/portfolio.js` の名前・学校名に誤字がない
- [ ] GitHub リポジトリのURLが正しく設定されている
- [ ] GitHubリポジトリが `public`（公開設定）になっている
- [ ] メールアドレスが正しい
- [ ] 未完成の作品を載せていない
- [ ] `npm run build` がエラーなく通る
- [ ] スマートフォンで表示確認をした

---

## 1. GitHubにプッシュする

```bash
# リポジトリを初期化
git init
git add .
git commit -m "initial commit"
git branch -M main

# GitHubでリポジトリを作成してから
git remote add origin https://github.com/あなたのID/my-portfolio.git
git push -u origin main
```

---

## 2. Vercelで公開する（推奨）

無料で最も簡単な方法です。GitHubと連携するだけで自動デプロイされます。

### 手順

1. [vercel.com](https://vercel.com) にアクセスし、GitHubアカウントでサインアップ
2. ダッシュボードの「Add New → Project」をクリック
3. GitHubリポジトリ一覧から `my-portfolio` を選択
4. 設定はデフォルトのまま「Deploy」をクリック
5. 数分で `https://my-portfolio-xxx.vercel.app` のURLが発行される

### 自動デプロイ

`git push` するたびにVercelが自動で再ビルド・再デプロイします。  
作品を追加したら push するだけで即座に反映されます。

```bash
git add .
git commit -m "新しい作品を追加"
git push
# → Vercel が自動でデプロイ
```

---

## 3. GitHub Pages で公開する場合

Vercel が使えない場合の代替手段です。

### vite.config.js を修正する

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // リポジトリ名に合わせて変更する
  base: '/my-portfolio/',
  plugins: [react()],
})
```

### デプロイ用パッケージをインストールする

```bash
npm install -D gh-pages
```

### package.json にスクリプトを追加する

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  }
}
```

### デプロイ実行

```bash
npm run build
npm run deploy
```

GitHubリポジトリの **Settings → Pages** で公開URLを確認できます。

### React Router と GitHub Pages の注意点

GitHub Pages は SPA（シングルページアプリ）のルーティングに対応していません。  
`/works/1` に直接アクセスすると 404 になります。  
作品詳細ページへのリンク共有が必要な場合は **Vercel を使うことを推奨します**。

---

## 4. カスタムドメインを設定する（任意）

`yourname-portfolio.com` のような独自ドメインを使いたい場合：

1. お名前.com や Cloudflare でドメインを取得（年1,000円〜）
2. Vercelの Project Settings → Domains でドメインを追加
3. ドメイン会社のDNS設定でVercelのIPを向ける

---

## 公開したURLを活用する

作成したURLを以下の場所に必ず貼りましょう。

- **GitHubプロフィール** → プロフィールREADME または Webサイト欄
- **X（Twitter）プロフィール**
- **履歴書・エントリーシート**
- **インターン・就職応募時の自己PR欄**

---

## ポートフォリオを継続的に更新する

ポートフォリオは「作って終わり」ではありません。

- 新しい作品ができたら `works` に追加して push する
- スキルが上がったら `level` と `capabilities` を更新する
- ゲームジャムに参加したら `gameJams` に追加する
- 資格を取得したら `status` を `'取得済み'` に変更する

**採用担当者は「最近更新されているか」も見ています。**  
Gitのコミット履歴が定期的に更新されていると、継続的に学習している印象を与えられます。
