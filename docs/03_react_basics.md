# 第3章：Reactの基礎知識

コンポーネントを作る前に必要なReactの知識をまとめます。

---

## コンポーネントとは

画面を「部品」に分けて作る仕組みです。部品を組み合わせて1ページを構成します。

```jsx
// 部品を定義する
function Greeting() {
  return <h1>こんにちは！</h1>
}

// 部品を使う（タグのように書く）
function App() {
  return (
    <div>
      <Greeting />
    </div>
  )
}
```

### JSXのルール

```jsx
// ✗ 複数の要素をそのまま返せない
return (
  <h1>タイトル</h1>
  <p>説明</p>
)

// ✓ 1つの要素で囲む（<> </> でもOK）
return (
  <>
    <h1>タイトル</h1>
    <p>説明</p>
  </>
)

// class ではなく className を使う
return <div className="container">...</div>
```

---

## Props（プロパティ）

コンポーネントに外からデータを渡す仕組みです。

```jsx
// Props を受け取る
function SkillCard({ name, level, version }) {
  return (
    <div>
      <strong>{name}</strong>
      <span>{version}</span>
      <span>{level}%</span>
    </div>
  )
}

// Props を渡す
<SkillCard name="Unity" version="2022.3 LTS" level={80} />
<SkillCard name="React" version="v18" level={65} />
```

---

## useState（状態管理）

ボタンクリックなど「変わるデータ」を管理します。

```jsx
import { useState } from 'react'

function FilterButtons() {
  // [現在の値, 値を変える関数] = useState(初期値)
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div>
      <button onClick={() => setActiveCategory('all')}>すべて</button>
      <button onClick={() => setActiveCategory('game')}>ゲーム</button>
      <p>現在: {activeCategory}</p>
    </div>
  )
}
```

**注意**: 値を変えるときは必ず `set〇〇()` 関数を使います。直接 `activeCategory = 'game'` と書いても画面は更新されません。

---

## useEffect（副作用）

コンポーネントが表示されたとき・値が変わったときに実行したい処理を書きます。

```jsx
import { useEffect } from 'react'

function ThemeApplier({ theme }) {
  useEffect(() => {
    // theme が変わるたびに実行される
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])  // ← [] の中の値が変わったときに実行

  return null
}
```

---

## カスタムフック

`useState` + `useEffect` のロジックをコンポーネントの外に切り出したものです。  
`use` で始まる関数として定義します。

```ts
// src/hooks/useTheme.ts
import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') ?? 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}

// 使うとき
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggle } = useTheme()
  return <button onClick={toggle}>{theme === 'dark' ? '☀️' : '🌙'}</button>
}
```

---

## map()でリストを表示する

配列のデータをループして画面に表示します。`key` は必須です。

```jsx
const skills = [
  { name: 'Unity', level: 80 },
  { name: 'React', level: 65 },
]

function SkillList() {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.name}>
          {skill.name}: {skill.level}%
        </li>
      ))}
    </ul>
  )
}
```

---

## 条件付きレンダリング

データがある場合だけ表示するときは `&&` を使います。

```jsx
function WorkCard({ work }) {
  return (
    <div>
      <h3>{work.title}</h3>

      {/* work.link がある場合だけ表示 */}
      {work.link && (
        <a href={work.link} target="_blank" rel="noreferrer">
          Live Demo
        </a>
      )}

      {/* 三項演算子で出し分け */}
      {work.team === '個人制作'
        ? <span>個人</span>
        : <span>チーム: {work.team}</span>
      }
    </div>
  )
}
```

---

## データの流れ

このポートフォリオのデータは `src/data/portfolio.js` に集約し、各コンポーネントが `import` して使います。

```
src/data/portfolio.js
    ↓ import
App.jsx
    ↓ props
Header / Hero / About / Skills / Works / GameJams / Certifications / Contact
    ↓ props
子コンポーネント（WorkCard, SkillCard など）
```

---

## 次のステップ

→ [第4章：データ設計](./04_data_design.md)
