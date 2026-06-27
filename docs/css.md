# CSS リファレンス

`src/styles/` 配下に **セクション別に分割** された CSS（合計 約 1500 行）の **全クラスの一覧と役割** をまとめたリファレンスです。  
このドキュメントは「読みもの」ではなく「辞書」として使ってください。

## ファイル構成

```
src/
├── index.css           ← @import で styles/ 配下を読み込むだけの集約ファイル
└── styles/
    ├── base.css          ← リセット・CSS変数・body・リンク・画像
    ├── utilities.css     ← .container / .section / .btn / .tag
    ├── header.css        ← Header
    ├── hero.css          ← Hero + .avatar-placeholder
    ├── about.css         ← About + .timeline
    ├── skills.css        ← Skills
    ├── works.css         ← Works 一覧
    ├── gamejams.css      ← GameJams
    ├── certifications.css ← Certifications（@media 含む）
    ├── contact.css       ← Contact
    ├── footer.css        ← フッター
    ├── work-detail.css   ← WorkDetail ページ（@media 含む）
    └── responsive.css    ← @media (max-width: 768px) 共通レスポンシブ
```

「Header の `.theme-toggle` を調整したい」と思ったら `src/styles/header.css` を開く、というように **クラス名から該当ファイルが推測できる** 構成です。

## 使い方

1. **まずはこのリポジトリの `src/index.css` と `src/styles/` をそのままコピーして使う**  
   全コンポーネントのスタイルが入った完成版です。書き写す必要はありません。
2. **見た目を変えたくなったら `src/styles/base.css` の CSS 変数（`:root`）を編集する**  
   色・フォント・角丸はトークン化されているので、1箇所変えるだけで全体に反映されます。
3. **個別のクラスを調整したくなったらこのページで該当箇所を探し、そのセクションの CSS ファイルを編集する**  
   クラス名から「これは何をするスタイルか」を逆引きできます。

---

## CSS変数（デザイントークン）

`:root` に定義した変数は全コンポーネントで共通して使えます。  
色・フォント・角丸をここで一括管理しているので、**カラーを変えるときはここだけ編集** すれば全体に反映されます。

```css
:root {
  --color-bg          背景色
  --color-surface     カード・ヘッダーなどの面の色
  --color-surface-2   一段階薄い面の色（タグ背景など）
  --color-border      ボーダー色
  --color-accent      アクセントカラー（紫）
  --color-accent-2    サブアクセントカラー（ピンク）
  --color-text        メインテキスト色
  --color-text-muted  補助テキスト色（説明文など）
  --font-en           英字フォント（Space Grotesk）
  --font-ja           日本語フォント（Noto Sans JP）
  --radius            角丸サイズ（12px）
  --transition        トランジション速度（0.3s ease）
}
```

ライトテーマは `[data-theme="light"]` セレクタで上書きします。  
`useTheme` フックが `document.documentElement` に `data-theme="light"` を付与することで切り替わります。

---

## ユーティリティクラス

コンポーネントをまたいで使い回す汎用クラスです。

### レイアウト

| クラス | 説明 |
|--------|------|
| `.container` | 最大幅 1100px・左右パディング 24px の中央寄せラッパー |
| `.section` | セクション共通の上下パディング（96px） |

### テキスト

| クラス | 説明 |
|--------|------|
| `.section-title` | セクション見出し（`<h2>`）。`<span>` で囲むとグラデーション文字になる |
| `.section-sub` | セクション副見出し（日本語説明文）。ミュートカラー |

### ボタン

| クラス | 説明 |
|--------|------|
| `.btn` | ボタン共通スタイル（高さ・角丸・トランジション） |
| `.btn-primary` | グラデーション背景の塗りつぶしボタン |
| `.btn-outline` | 透明背景のボーダーボタン |

### タグ

| クラス | 説明 |
|--------|------|
| `.tag` | 技術スタックなどのピルバッジ（グレー背景・ボーダー） |

---

## Header

```
.header          固定ヘッダー全体（blur背景・z-index 100）
.header-inner    ロゴ・ナビ・テーマ切替を横並びにするFlexコンテナ
.header-logo     左端のサイト名テキストリンク
.header-nav      ナビゲーションリストのFlexコンテナ
.theme-toggle    右端のテーマ切替ボタン（丸形）
```

モバイル（768px以下）では `.header-nav` が `display: none` になります。

---

## Hero

```
.hero              ファーストビューセクション（min-height: 100vh）
.avatar-placeholder  アバター画像がない場合の丸いプレースホルダー
.hero-eyebrow      "Portfolio" の小さな見出しラベル（上線付き）
.hero-name         名前の大見出し（clamp でレスポンシブフォントサイズ）
.hero-name-en      ローマ字の小さな副見出し
.hero-name .gradient  グラデーション文字（<span className="gradient"> に適用）
.hero-role         役職テキスト
.hero-motto        座右の銘の引用ブロック（左ボーダー付き）
.hero-motto-mark   クォーテーションマーク（" ）
.hero-actions      CTAボタンを横並びにするFlexコンテナ
.hero-scroll       下部スクロールインジケーター（バウンスアニメーション付き）
```

---

## About

```
.about-grid          ProfileカードとTimelineカードを2カラムで並べるGridコンテナ
.about-card          各カード共通スタイル（ボーダー・角丸・パディング）
.about-bio           自己紹介テキスト
.profile-school      学校情報の定義リスト（dl要素に適用）
.profile-school-row  学校・学科・卒業の各行（dt + dd を横並びに）
.profile-graduation  卒業予定年のアクセントカラーテキスト
.timeline            タイムラインリスト（縦線付き）
.timeline-year       タイムラインの年表示（アクセントカラー・英字フォント）
.timeline-event      タイムラインの出来事テキスト
```

---

## Skills

```
.skills-categories   フィルターボタンを横並びにするFlexコンテナ
.skill-filter-btn    フィルターボタン（.active クラスでハイライト）
.skills-grid         スキルカードのグリッドレイアウト（auto-fill）
```

### スキルカード内部

```
.skill-card           カード全体（ホバーでボーダーハイライト）
.skill-card-header    スキル名・バージョン・バッジを横並びにするFlexコンテナ
.skill-card-title-row スキル名とバージョンを縦に並べるFlexコンテナ
.skill-card-name      スキル名テキスト（英字フォント・太字）
.skill-card-version   バージョン表記（小さいグレーテキスト）
.skill-card-badge     熟練度ラベル（色はJSのstyleで動的に指定）
.skill-bar-bg         スキルバーの背景トラック
.skill-bar-fill       スキルバーの塗り部分（widthをJSで指定）
.skill-capabilities   できること一覧のFlexラップリスト
.skill-cap-tag        できることの各タグ（グレー背景・ピル型）
.skill-note           実装経験メモ（上ボーダー・小テキスト）
.skill-note-icon      ✦ アイコン（アクセント2カラー）
```

---

## Works

```
.works-grid           制作物カードのグリッドレイアウト（auto-fill）
```

### WorkCard内部

```
.work-card            カード全体（ホバーで浮き上がり）
.work-thumbnail       サムネイル領域（高さ200px・画像またはEmoji）
.work-body            カード本文エリア
.work-category-badge  ジャンルラベル（アクセントカラー・大文字）
.work-title           作品タイトル
.work-description     作品説明テキスト
.work-meta            期間・担当・PFの小テキスト（span で値を強調）
.work-venues          出展・公開先の一覧コンテナ
.work-venue-tag       出展先の各タグ
.work-tags            技術タグの横並びコンテナ
.work-links           ボタン群の横並びコンテナ（上ボーダー付き）
.work-btn             カード内ボタンのサイズ調整用修飾クラス
```

---

## GameJams

```
.jam-grid          ゲームジャムカードのグリッドレイアウト
```

### JamCard内部

```
.jam-card           カード全体
.jam-header         名前・日付・結果バッジのFlexコンテナ
.jam-name           ゲームジャム名
.jam-header-sub     日付と結果バッジを横並びにするFlexコンテナ
.jam-date           開催日テキスト
.jam-result         順位などの結果バッジ（黄色）
.jam-theme          テーマの引用ブロック（左ボーダー付き）
.jam-theme-label    "テーマ" ラベル（英字・大文字）
.jam-theme-text     テーマ本文
.jam-description    作品説明テキスト
.jam-meta-row       PF・担当・チームの情報ブロック（グレー背景）
.jam-meta-item      各メタ情報の行
.jam-meta-label     ラベル（PF・担当・チーム）
.jam-meta-value     値テキスト
.jam-reflection     振り返りテキスト（電球アイコン付き）
.jam-reflection-icon 💡 アイコン
.jam-footer         カード下部のリンクエリア
```

---

## Certifications

```
.cert-list    資格リストのFlexColumnコンテナ
```

### CertRow内部

```
.cert-row       各行全体（4カラムGrid：アイコン・本文・カテゴリ・ステータス）
.cert-icon      カテゴリアイコンの丸いコンテナ
.cert-main      資格名・スコア・日付のエリア
.cert-name-row  資格名とスコアバッジを横並びにするFlexコンテナ
.cert-name      資格名テキスト
.cert-score     点数バッジ（アクセントカラー・ピル型）
.cert-date      取得日テキスト（グレー）
.cert-meta      カテゴリバッジのコンテナ
.cert-category  カテゴリラベル（グレー背景・ピル型）
.cert-status    ステータスバッジ（色はJSのstyleで動的に指定）
```

モバイル（640px以下）では `.cert-row` が2カラムに切り替わります。

---

## Contact

```
.contact-inner     中央寄せのコンテナ（最大幅 560px）
.contact-desc      説明テキスト
.contact-links     リンクボタンを横並びにするFlexコンテナ
.contact-link-item 各連絡先リンク（ボーダーカード形式）
.contact-link-icon アイコン（react-icons のSVG）
```

---

## Footer

```
.footer    フッター全体（上ボーダー・中央寄せ・グレーテキスト）
```

---

## WorkDetail（作品詳細ページ）

```
.wd-page            詳細ページ全体（上下パディング）
.wd-back            「← 作品一覧に戻る」テキストリンク
```

### ヒーローエリア

```
.wd-hero              サムネイルと基本情報を2カラムに並べるGridコンテナ
.wd-hero-thumbnail    サムネイル画像領域（16:9比率）
.wd-hero-info         タイトル・説明・タグ・リンクのエリア
.wd-title             作品タイトル大見出し
.wd-description       作品説明テキスト
.wd-hero-links        GitHubとLive Demoのボタンエリア
```

### スクリーンショット

```
.wd-screenshots     スクリーンショットのGridコンテナ
.wd-screenshot-img  各スクリーンショット画像（角丸・ボーダー）
```

### 基本情報テーブル

```
.wd-meta-grid    制作期間・チーム・担当・PFを2カラムGridで並べるコンテナ
.wd-meta-row     各情報のカード（ラベル + 値の縦並び）
.wd-meta-label   ラベル（英字・大文字・アクセントカラー）
.wd-meta-value   値テキスト
```

### 出展・公開先

```
.wd-venues        出展先エリア全体（上ボーダー付き）
.wd-venues-label  "出展・公開先" のラベルテキスト
.wd-venues-list   出展先リストのFlexColumnコンテナ
.wd-venue-item    各出展先の行（アイコン・名前・日付を横並び）
.wd-venue-icon    📍 アイコン
.wd-venue-name    会場・公開先名
.wd-venue-date    日付（右端寄せ）
```

### 技術詳細グリッド

```
.wd-tech-grid     技術詳細セクションを2カラムで並べるGridコンテナ
.wd-section       各技術詳細セクションのカード
.wd-section-title セクション見出し（英字・大文字・アクセントカラー）
.wd-section-body  セクション本文エリア
.wd-text          本文テキスト（グレー・行間広め）
.wd-theme         実装解説テーマの強調ブロック（左ボーダー付き紫背景）
```

モバイル（768px以下）では `.wd-hero`・`.wd-meta-grid`・`.wd-tech-grid` がすべて1カラムになります。

---

## レスポンシブ対応（`@media`）

| ブレークポイント | 変更内容 |
|-----------------|---------|
| `max-width: 768px` | `.header-nav` 非表示、`.about-grid` 1カラム化、`.works-grid` 1カラム化、`.hero-actions` 縦並び |
| `max-width: 768px` | `.wd-hero`・`.wd-meta-grid`・`.wd-tech-grid` を1カラム化 |
| `max-width: 640px` | `.cert-row` を2カラムGridに変更（アイコン + 本文のみ） |

---

## カスタマイズのヒント

### カラーを変えたい

```css
:root {
  --color-accent: #7c6af7;   ← ここを変えると全体のアクセントカラーが変わる
  --color-accent-2: #f76ac8; ← グラデーションの終端色
}
```

### カードの角丸を変えたい

```css
:root {
  --radius: 12px; ← 大きくすると丸く、0にすると四角になる
}
```

### フォントを変えたい

1. `index.html` の Google Fonts リンクを変更する
2. `src/index.css` の `:root` で `--font-en` / `--font-ja` を更新する
