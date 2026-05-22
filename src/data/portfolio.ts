export interface Profile {
  name: string
  nameEn: string
  role: string
  school: string
  department: string
  graduationYear: string
  bio: string
  motto: string | null
  avatar: string | null
  links: {
    github: string
    twitter: string
    email: string
  }
}

export interface Skill {
  name: string
  version: string
  level: number
  category: string
  capabilities: string[]
  note: string | null
}

export interface Venue {
  name: string
  date: string
}

export interface Work {
  id: number
  title: string
  genre: string
  category: string
  thumbnail: string | null
  screenshots: string[]
  description: string
  tags: string[]
  platform: string[]
  period: string
  team: string
  role: string
  github: string | null
  link: string | null
  venues: Venue[]
  techPoints: string | null
  designNotes: string | null
  implementationTheme: string | null
  troubleshooting: string | null
  performance: string | null
}

export interface GameJam {
  name: string
  date: string
  theme: string
  description: string
  platform: string[]
  role: string
  team: string
  result: string | null
  url: string | null
  reflection: string
}

export type CertStatus = '取得済み' | '受験予定' | '取得予定' | '学習中'

export interface Certification {
  name: string
  date: string
  category: string
  score: string | null
  status: CertStatus
}

export interface TimelineItem {
  year: string
  event: string
}

export const profile: Profile = {
  name: '山田 太郎',
  nameEn: 'Taro Yamada',
  role: 'Game Creator / Web Developer',
  school: '◯◯専門学校',
  department: 'ゲームクリエイター科',
  graduationYear: '2027年3月卒業見込み',
  bio: 'ゲームが好きで専門学校に入学。Unity・Unreal Engine を使ったゲーム開発と、Webフロントエンド技術を学んでいます。ユーザーが「楽しい！」と感じる体験を作ることが目標です。',
  motto: '信頼は、積むもの',
  avatar: null,
  links: {
    github: 'https://github.com/username',
    twitter: 'https://twitter.com/username',
    email: 'taro@example.com',
  },
}

export const skills: Skill[] = [
  {
    name: 'Unity',
    version: '2022.3 LTS',
    level: 80,
    category: 'game',
    capabilities: ['3D/2Dゲーム開発', 'Physics演算', 'UI Toolkit', 'ProceduralGeneration', 'ScriptableObject'],
    note: 'プロシージャル迷宮生成・A*経路探索を個人作品で実装済み',
  },
  {
    name: 'C#',
    version: '.NET 6 / Unity対応',
    level: 70,
    category: 'language',
    capabilities: ['OOP設計', 'インターフェース活用', 'コルーチン', 'LINQ', 'ジェネリクス'],
    note: 'Unityゲーム開発を通じて実践的に習得',
  },
  {
    name: 'Unreal Engine',
    version: 'UE5.3',
    level: 50,
    category: 'game',
    capabilities: ['Blueprint', 'レベル設計', 'Nanite/Lumen基礎', 'C++基礎'],
    note: '授業課題でFPS プロトタイプを制作。Blueprintは独力で実装可能',
  },
  {
    name: 'React',
    version: 'v18 / Hooks',
    level: 65,
    category: 'web',
    capabilities: ['コンポーネント設計', 'useState/useEffect', 'Props/Context', 'Vite構築'],
    note: 'このポートフォリオサイト自体をReactで制作',
  },
  {
    name: 'Vue.js',
    version: 'v3 / Composition API',
    level: 60,
    category: 'web',
    capabilities: ['SFC (.vue)', 'ref/reactive', 'v-for/v-if', 'emit'],
    note: '授業課題のTodoアプリ・簡易ECサイトで使用',
  },
  {
    name: 'JavaScript',
    version: 'ES2022',
    level: 70,
    category: 'language',
    capabilities: ['非同期処理(async/await)', 'fetch API', '配列操作', 'モジュール(ESM)'],
    note: 'フロントエンド開発の基礎として日常的に使用',
  },
  {
    name: 'HTML / CSS',
    version: 'HTML5 / CSS3',
    level: 85,
    category: 'web',
    capabilities: ['セマンティックHTML', 'CSS Grid/Flexbox', 'CSS変数', 'レスポンシブ対応', 'アニメーション'],
    note: 'マークアップ・スタイリングは自走できる水準',
  },
  {
    name: 'Blender',
    version: '4.1',
    level: 45,
    category: 'graphic',
    capabilities: ['ローポリモデリング', 'UV展開', 'マテリアル設定', 'FBXエクスポート'],
    note: 'ゲーム用の小道具モデルをUnityに組み込んだ経験あり。学習中',
  },
  {
    name: 'Git',
    version: '2.x',
    level: 70,
    category: 'vcs',
    capabilities: ['ブランチ運用', 'プルリクエスト', 'コンフリクト解消', 'rebase/cherry-pick'],
    note: 'チーム開発でGitHub Flowを実践。コードレビュー経験あり',
  },
  {
    name: 'GitHub',
    version: 'GitHub.com / Actions',
    level: 65,
    category: 'vcs',
    capabilities: ['リポジトリ管理', 'Issues / PR', 'GitHub Actions基礎', 'GitHub Pages'],
    note: '個人・チーム制作ともにGitHubで管理',
  },
  {
    name: 'Windows',
    version: 'Windows 11',
    level: 85,
    category: 'os',
    capabilities: ['開発環境構築', 'PowerShell基礎', 'WSL2', 'ファイルシステム管理'],
    note: 'メイン開発環境。ゲーム開発・Web開発ともにWindows上で実施',
  },
  {
    name: 'macOS',
    version: 'Ventura以降',
    level: 50,
    category: 'os',
    capabilities: ['Terminal操作', 'brew', '基本的な開発環境構築'],
    note: '授業用貸出PCで使用経験あり。個人環境はWindows',
  },
  {
    name: 'Adobe Photoshop',
    version: 'CC 2024',
    level: 60,
    category: 'graphic',
    capabilities: ['テクスチャ制作', 'UI素材制作', 'レタッチ', 'レイヤー管理'],
    note: 'ゲームのUI画像・スプライト素材を制作',
  },
  {
    name: 'Adobe Illustrator',
    version: 'CC 2024',
    level: 45,
    category: 'graphic',
    capabilities: ['ロゴ制作', 'ベクターアイコン', 'SVGエクスポート'],
    note: '学習中。ポートフォリオのロゴ素材を自作',
  },
  {
    name: 'Audacity',
    version: '3.x',
    level: 50,
    category: 'sound',
    capabilities: ['SE録音・編集', 'ノイズ除去', 'MP3/WAVエクスポート', 'ループ調整'],
    note: 'ゲーム用SEを自作・編集してUnityに組み込んだ経験あり',
  },
  {
    name: 'CRI ADX',
    version: 'LE版',
    level: 35,
    category: 'sound',
    capabilities: ['Unityミドルウェア連携', '3Dサウンド設定', 'ループ再生'],
    note: '授業で触れた程度。基礎操作のみ',
  },
  {
    name: 'Vite',
    version: 'v6.x',
    level: 65,
    category: 'tool',
    capabilities: ['開発サーバー', 'ビルド設定', 'プラグイン導入', 'HMR'],
    note: 'このポートフォリオを含む複数のWebプロジェクトで使用',
  },
  {
    name: 'Node.js / npm',
    version: 'Node 20 LTS',
    level: 60,
    category: 'tool',
    capabilities: ['パッケージ管理', 'スクリプト実行', '開発環境構築', 'npx'],
    note: 'Web開発の基盤として日常的に使用',
  },
  {
    name: 'VS Code',
    version: '最新安定版',
    level: 80,
    category: 'tool',
    capabilities: ['拡張機能カスタマイズ', 'デバッガー', 'Git統合', 'Emmet'],
    note: 'メインエディタ。ショートカット・スニペットを積極的に活用',
  },
]

export const works: Work[] = [
  {
    id: 1,
    title: '迷宮脱出ゲーム',
    genre: '3Dパズルアクション',
    category: 'game',
    thumbnail: null,
    screenshots: [],
    description:
      'Unityで制作した3D迷宮脱出ゲーム。プロシージャル生成でランダムな迷宮を自動生成し、毎回異なる体験を提供します。制限時間内に出口を目指すシンプルなルールながら、生成パターンの多様性で高いリプレイ性を実現しました。',
    tags: ['Unity', 'C#', 'ProceduralGeneration', 'NavMesh'],
    platform: ['Windows', 'WebGL'],
    period: '2025年10月〜2026年1月（3ヶ月）',
    team: '個人制作',
    role: 'プログラマー / レベルデザイナー（全工程）',
    github: 'https://github.com/username/maze-escape',
    link: null,
    venues: [
      { name: '学校 卒業制作展示会', date: '2026年2月' },
      { name: 'itch.io 公開', date: '2026年3月〜' },
    ],
    techPoints:
      'プロシージャル迷宮生成にDFS（深さ優先探索）アルゴリズムを採用。必ず解けることを保証しながら、分岐・行き止まりの密度をパラメータで調整できる設計にしました。',
    designNotes:
      'MazeGeneratorクラスを生成ロジック専用に分離し、MonoBehaviourに依存しない純粋なC#クラスとして実装。ユニットテストが書けるよう設計しました。',
    implementationTheme:
      'DFSによる迷宮自動生成と、NavMeshを使ったプレイヤー誘導システムの連携',
    troubleshooting:
      '生成直後にNavMeshをベイクするとフレームレートが大きく落ちる問題が発生。非同期ベイク（AsyncOperation）を使いロード画面中に処理することで解決しました。',
    performance:
      'セルをPrefabの動的生成から Object Pool に切り替えることで、生成時のGCアロケーションを約70%削減。60fps安定を達成しました。',
  },
  {
    id: 2,
    title: 'タワーディフェンス',
    genre: 'ストラテジー / タワーディフェンス',
    category: 'game',
    thumbnail: null,
    screenshots: [],
    description:
      'チーム3人で開発したタワーディフェンスゲーム。敵AIのパスファインディングにA*アルゴリズムを実装し、タワー設置によってルートが動的に変化するリアクティブなAIを実現しました。',
    tags: ['Unity', 'C#', 'A*Pathfinding', 'ScriptableObject'],
    platform: ['Windows'],
    period: '2025年6月〜2025年9月（4ヶ月）',
    team: '3人（PG×2、レベルデザイン×1）',
    role: 'メインプログラマー（敵AI・ゲームループ担当）',
    github: 'https://github.com/username/tower-defense',
    link: null,
    venues: [
      { name: 'ゲームジャム（学内）', date: '2025年9月' },
    ],
    techPoints:
      'A*アルゴリズムをゼロから実装。タワー設置のたびにグリッドを更新し、敵が最短経路を再探索する動的パスファインディングを実現しました。',
    designNotes:
      'タワーの種類・敵の種類をScriptableObjectで定義し、データとロジックを分離。バランス調整をコード変更なしにInspectorから行える構造にしました。',
    implementationTheme:
      '動的グリッドへのA*再探索と、ScriptableObjectを用いたデータ駆動設計',
    troubleshooting:
      '敵が大量出現したとき全員が毎フレームA*を実行し処理落ち。タワー設置イベント時のみ再探索し、結果をキャッシュして各敵が参照する方式に変更して解決しました。',
    performance:
      'パスキャッシュの導入で敵20体同時出現時のCPU負荷を約60%削減。またグリッドをJobSystem対応に書き直し、マルチスレッド探索を試験実装中です。',
  },
  {
    id: 3,
    title: 'ゲーム紹介サイト',
    genre: 'Webサイト / ポートフォリオ',
    category: 'web',
    thumbnail: null,
    screenshots: [],
    description:
      'Reactで制作した自作ゲームの紹介Webサイト。スクロール連動アニメーションとインタラクティブなUIで、ゲームの世界観をWebで表現することを目指しました。',
    tags: ['React', 'Vite', 'CSS Animation', 'Intersection Observer'],
    platform: ['Web（全ブラウザ対応）'],
    period: '2026年2月〜2026年3月（2ヶ月）',
    team: '個人制作',
    role: 'フロントエンド全般（設計・実装・デプロイ）',
    github: 'https://github.com/username/game-showcase',
    link: 'https://example.com',
    venues: [
      { name: 'Vercel 公開中', date: '2026年3月〜' },
    ],
    techPoints:
      'Intersection Observer APIを使ったスクロール連動アニメーションをカスタムフック（useInView）として実装。再利用可能にしたことで全セクションに一貫したアニメーションを適用できました。',
    designNotes:
      'デザイントークン（CSS変数）でカラー・タイポグラフィを一元管理。テーマ切替をCSS変数の差し替えだけで実現できる構造にしました。',
    implementationTheme:
      'useInViewカスタムフックとCSS変数によるテーマ設計',
    troubleshooting:
      '画像の遅延読み込みを実装した際、低速回線でレイアウトシフトが発生。width/heightの明示とskeleton UIを組み合わせてCLSスコアを改善しました。',
    performance:
      'Lighthouseスコア：Performance 94 / Accessibility 100。画像をWebP変換・Viteのコード分割・フォントのdisplay:swapで初期読み込みを最適化しました。',
  },
  {
    id: 4,
    title: 'AIの歌',
    genre: '音楽ゲーム / リズムアクション',
    category: 'game',
    thumbnail: '/images/ai_songs.png',
    screenshots: [],
    description:
      'AIが生成した楽曲に合わせてノーツを叩くスマートフォン向け音楽ゲーム。楽曲・譜面ともにAIで自動生成しており、毎回異なる曲でプレイできます。Unityで開発しAndroid / iOSに対応しています。',
    tags: ['Unity', 'C#', 'Android', 'iOS', 'AI生成', 'AudioSource'],
    platform: ['Android', 'iOS'],
    period: '2026年2月〜2026年4月（2ヶ月）',
    team: '個人制作',
    role: 'プログラマー / ゲームデザイン全般',
    github: 'https://github.com/username/ai-songs',
    link: null,
    venues: [
      { name: '学内プロジェクト発表会', date: '2026年4月' },
    ],
    techPoints:
      'AI生成音源のBPMをリアルタイム解析し、ノーツのタイミングを自動算出する譜面生成システムを実装。楽曲が変わっても自動で譜面が生成されます。',
    designNotes:
      'ノーツ生成・判定・スコア計算をそれぞれ独立したクラスに分離。AudioSource の再生位置（timeSamples）を基準にすることで、端末の処理負荷によるズレを最小化しました。',
    implementationTheme:
      'AudioSource.timeSamples を使ったフレームレート非依存のノーツ判定システム',
    troubleshooting:
      '端末スペックによって音声と判定のズレが生じる問題が発生。Update()のDeltaTimeではなくAudioSourceの再生サンプル位置を基準にすることでズレを±20ms以内に抑えました。',
    performance:
      'ノーツをObject Poolで管理し、生成・破棄のGCを排除。ミドルレンジのAndroid端末（Snapdragon 695）で60fps安定を確認しました。',
  },
]

export const gameJams: GameJam[] = [
  {
    name: 'Global Game Jam 2025',
    date: '2025年1月（48時間制作）',
    theme: '「Bubble」→ 泡を使った物理パズルを制作',
    description: '泡を膨らませて障害物を押しのけ、ゴールまで誘導する2D物理パズルゲーム。',
    platform: ['WebGL', 'Windows'],
    role: 'プログラマー（物理演算・ステージ生成担当）',
    team: '4名（PG×2・デザイナー×1・サウンド×1）',
    result: null,
    url: 'https://itch.io/username/ggj2025',
    reflection: '48時間という制約で機能を絞る判断力が鍛えられた。スコープ管理の重要性を実感した。',
  },
  {
    name: 'Unity1週間ゲームジャム',
    date: '2025年11月（1週間制作）',
    theme: '「穴」→ 穴を掘って敵を落とすアクションゲームを制作',
    description: 'スコップで地面を掘り、追いかけてくる敵を穴に落とすシンプルなカジュアルアクション。',
    platform: ['WebGL'],
    role: '全工程（個人制作）',
    team: '個人制作',
    result: '総合ランキング 47位 / 参加数 312作品',
    url: 'https://unityroom.com/username/hole-action',
    reflection: 'ゲームループを2日で完成させ、残り5日間でポリッシュに集中できた。チュートリアル設計の難しさを学んだ。',
  },
  {
    name: 'GMTK Game Jam 2024',
    date: '2024年8月（48時間制作）',
    theme: '「Built to Scale」→ サイズ変化を使ったパズルゲームを制作',
    description: 'キャラクターのサイズを変えて、小さくなって狭い通路を抜けたり、大きくなって障害物を壊したりするパズルプラットフォーマー。',
    platform: ['WebGL'],
    role: 'プログラマー',
    team: '2名（PG×1・デザイナー×1）',
    result: null,
    url: 'https://itch.io/username/gmtk2024',
    reflection: '初めての海外ジャム参加。英語でのコミュニケーションと、短時間でのプロトタイプ検証を経験した。',
  },
]

export const certifications: Certification[] = [
  {
    name: 'ITパスポート',
    date: '2024年10月合格',
    category: '国家資格',
    score: '665点',
    status: '取得済み',
  },
  {
    name: 'Unity認定アソシエイト',
    date: '2025年2月取得',
    category: 'ベンダー認定',
    score: null,
    status: '取得済み',
  },
  {
    name: '基本情報技術者試験',
    date: '受験予定（2026年10月）',
    category: '国家資格',
    score: null,
    status: '受験予定',
  },
  {
    name: 'AtCoder',
    date: '2025年6月達成',
    category: '競プロ',
    score: 'Rating 512（茶色）',
    status: '取得済み',
  },
  {
    name: 'MOS Excel 365',
    date: '2024年8月取得',
    category: 'ベンダー認定',
    score: '890点',
    status: '取得済み',
  },
  {
    name: '普通自動車第一種運転免許（AT限定）',
    date: '教習所通学中',
    category: '免許',
    score: null,
    status: '取得予定',
  },
]

export const timeline: TimelineItem[] = [
  { year: '2024年4月', event: '◯◯専門学校 ゲームクリエイター科 入学' },
  { year: '2024年7月', event: 'Unity基礎習得・初めてのゲーム完成' },
  { year: '2025年6月', event: 'チーム開発プロジェクト開始' },
  { year: '2025年10月', event: '個人制作プロジェクト開始' },
  { year: '2026年3月', event: 'ゲーム企業インターン参加' },
]
