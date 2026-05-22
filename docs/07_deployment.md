# 第7章：デプロイ（インターネットに公開する）

ポートフォリオは **URL を共有できる状態** にして初めて意味を持ちます。

---

## 公開前チェックリスト

- [ ] `index.html` の `<title>` を自分の名前に変更した
- [ ] `src/data/portfolio.ts` の名前・学校名に誤字がない
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

## 4. AWS S3 + CloudFront で公開する場合

AWS で自前運用するパターンです。Vercel より自由度は高いですが設定項目が多く、特に **SPA のルーティング対応** で詰まりやすいので注意点を解説します。

### 4-1. 基本構成

```
ユーザー
   ↓
CloudFront（CDN・HTTPS終端・キャッシュ）
   ↓
S3 バケット（dist/ をアップロード）
```

### 4-2. ざっくり手順

1. **S3 バケットを作成** し、`npm run build` で出力された `dist/` 配下を全部アップロード
2. **CloudFront ディストリビューションを作成** し、Origin を上記 S3 バケットに設定
3. **Default Root Object** に `index.html` を指定
4. **Origin Access Control (OAC)** を有効化し、S3 バケットポリシーで CloudFront からのみ読めるよう設定
5. （独自ドメインを使う場合）**Alternate domain names (CNAMEs)** にドメインを追加し、ACM で SSL 証明書を発行

### 4-3. ⚠️ 重要：SPA フォールバック設定

> このプロジェクトのように React Router で **複数のページパス** を使う場合、**必ずこの設定が必要** です。設定を忘れると `/works/1` への直接アクセスで **`AccessDenied`** エラーが出ます。

#### なぜ必要か

- ブラウザが `https://example.com/works/1` を直接開く
- CloudFront が S3 から `/works/1` というキーを探す
- 実体は `index.html` しか無いので、S3 が `403 AccessDenied` を返す
- 結果、ブラウザに `AccessDenied` の生エラーが表示される

React Router は **ブラウザ側で動く** ので、まずは何でもいいから `index.html` をブラウザに届ければ、URL を見て自動で正しいページを表示してくれます。

#### 設定手順（CloudFront Custom Error Response）

1. CloudFront → 対象ディストリビューション → **「Error pages」** タブを開く
2. **「Create custom error response」** をクリック
3. 以下の **2つ** を作成：

| 項目 | 403用 | 404用 |
|------|------|------|
| HTTP error code | **403: Forbidden** | **404: Not Found** |
| Error caching minimum TTL | `10` 秒 | `10` 秒 |
| Customize error response | **Yes** | **Yes** |
| Response page path | `/index.html` | `/index.html` |
| HTTP Response code | **200: OK** | **200: OK** |

4. 保存後、CloudFront の **Invalidation** で `/*` をキャッシュ削除すれば数分で反映

#### 動作の流れ（修正後）

- ブラウザが `/works/1` をリクエスト
- S3 が `403 AccessDenied` を返す
- CloudFront が `403` を検知し、代わりに `/index.html` を **`200 OK`** で返す
- ブラウザは正常な HTML を受け取り、React Router が起動して `<WorkDetail />` を表示

### 4-4. もう一つの方法：CloudFront Functions で URI リライト

4-3 の Custom Error Response が **「S3 から 403 が返ってきた後に拾う」リアクティブな方式** だったのに対し、CloudFront Functions は **「S3 に渡る前にリクエストの URI を書き換える」プロアクティブな方式** です。

末尾スラッシュ (`/`) で終わる URL を `index.html` 付きに揃えたいケースや、より細かい挙動制御をしたい場合に便利です。

#### 関数コード

AWS 公式サンプルベースの URI リライト関数です。

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
```

#### 何をしているか

| リクエスト URI | 書き換え後 | 用途 |
|---------------|-----------|------|
| `/` | `/index.html` | トップページ |
| `/about/` | `/about/index.html` | 末尾スラッシュ付きのクリーン URL |
| `/works/1` | `/works/1/index.html` | 拡張子なしのパス |
| `/assets/index-abc.js` | （変更なし） | 拡張子がある = 静的ファイル |

> **注意**: この関数は `/works/1` を `/works/1/index.html` に書き換えますが、Vite ビルドの出力にそのファイルは存在しません。したがって **この関数だけでは不十分** で、**4-3 の Custom Error Response と組み合わせて使う** か、関数自体を `request.uri = '/index.html'` のように **常にルート index.html へ書き換える形** に変更する必要があります。

#### SPA 向けの簡略版（こちらが React Router プロジェクトには素直）

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // 拡張子なしのパス（=React Router のルート）は常に /index.html を返す
    if (!uri.includes('.')) {
        request.uri = '/index.html';
    }

    return request;
}
```

こちらだと S3 が 403 を返すこと自体がなくなるので、Custom Error Response が不要になります。

#### 設定手順

1. CloudFront → 左メニュー **「Functions」** → **「Create function」**
2. 名前を `spa-uri-rewrite` などにして関数を作成
3. **「Build」** タブのエディタに上記コードを貼り付け → **「Save changes」**
4. **「Publish」** タブで **「Publish function」**
5. 対象ディストリビューションの **「Behaviors」** タブ → 該当ビヘイビアを編集 → **「Function associations」** で：
   - **Event type**: `Viewer request`
   - **Function type**: `CloudFront Functions`
   - **Function ARN/Name**: 作成した関数を選択
6. 保存後、`/*` の Invalidation で反映

#### Custom Error Response と Functions、どちらを使う？

| 観点 | Custom Error Response (4-3) | CloudFront Functions (4-4) |
|------|----------------------------|---------------------------|
| 設定難度 | ◎ 画面で項目入力するだけ | △ 関数コードの理解が必要 |
| 動作モデル | リアクティブ（403 後にフォールバック） | プロアクティブ（事前リライト） |
| 末尾スラッシュ処理 | × 別途設定が必要 | ◎ きれいにハンドリングできる |
| 本物の 404 を区別 | × ぜんぶ index.html になる | ○ 関数のロジック次第で可能 |
| 学習コスト | 低 | 中 |

**まずは 4-3 の Custom Error Response で十分** です。クリーン URL や複数 SPA の同居など、より凝った挙動が必要になったら 4-4 の Functions を検討してください。

### 4-5. デプロイの自動化

毎回手動で S3 にアップロードするのは大変なので、AWS CLI を使うと便利です。

```bash
# AWS CLI のインストールが必要
aws s3 sync dist/ s3://your-bucket-name/ --delete

# CloudFront キャッシュをクリア
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

`package.json` の `scripts` に登録しておくと `npm run deploy` で一発デプロイできます。

```json
{
  "scripts": {
    "deploy": "npm run build && aws s3 sync dist/ s3://your-bucket-name/ --delete && aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths '/*'"
  }
}
```

> **ヒント**: GitHub Actions と OIDC を組み合わせれば、`git push` で自動デプロイも実現できます（やや上級）。

---

## 5. カスタムドメインを設定する（任意）

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
