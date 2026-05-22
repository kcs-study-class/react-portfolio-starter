# 第6章：ReactとVueの比較

同じポートフォリオをVueで書くとどうなるか、コードを対比しながら学びます。

---

## プロジェクトの作り方

### React

```bash
npm create vite@latest my-portfolio -- --template react
cd my-portfolio
npm install react-router-dom
npm run dev
```

### Vue

```bash
npm create vite@latest my-portfolio -- --template vue
cd my-portfolio
npm install vue-router
npm run dev
```

`src/data/portfolio.js` は React版・Vue版で **まったく同じ内容**が使えます。  
変わるのはコンポーネントファイルの書き方だけです。

---

## コンポーネントの書き方

### React（.jsx）

```jsx
// Header.jsx
import { profile } from '../data/portfolio'

export default function Header({ theme, onThemeToggle }) {
  return (
    <header className="header">
      <a href="#hero" className="header-logo">
        {profile.nameEn.split(' ')[0]}<span>.</span>
      </a>
      <button onClick={onThemeToggle}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
```

### Vue（.vue）

```vue
<!-- Header.vue -->
<template>
  <header class="header">
    <a href="#hero" class="header-logo">
      {{ firstName }}<span>.</span>
    </a>
    <button @click="$emit('toggle-theme')">
      {{ theme === 'dark' ? '☀️' : '🌙' }}
    </button>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { profile } from '../data/portfolio'

const props = defineProps({ theme: String })
defineEmits(['toggle-theme'])

const firstName = computed(() => profile.nameEn.split(' ')[0])
</script>
```

**違い**:
- Reactは `className`、Vueは `class`
- Reactは `{変数}`、Vueは `{{ 変数 }}`
- Reactはイベントを `props` で渡す、Vueは `emit` で親に通知する

---

## 状態管理

### React（useState）

```jsx
import { useState } from 'react'

function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <button onClick={() => setActiveCategory('game')}>ゲーム</button>
  )
}
```

### Vue（ref）

```vue
<template>
  <button @click="activeCategory = 'game'">ゲーム</button>
</template>

<script setup>
import { ref } from 'vue'
const activeCategory = ref('all')
</script>
```

**違い**:
- Reactは「値を変える関数」を必ず使う（`setActiveCategory('game')`）
- Vueは `ref` で包んだ変数に直接代入できる（`activeCategory = 'game'`）

---

## リストレンダリング

### React（map）

```jsx
{skills.map((skill) => (
  <SkillCard key={skill.name} skill={skill} />
))}
```

### Vue（v-for）

```vue
<SkillCard
  v-for="skill in skills"
  :key="skill.name"
  :skill="skill"
/>
```

---

## 条件レンダリング

### React

```jsx
{work.link && <a href={work.link}>Live Demo</a>}
```

### Vue

```vue
<a v-if="work.link" :href="work.link">Live Demo</a>
```

---

## カスタムフック vs Composable

### React（useTheme.js）

```js
export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'dark')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}
```

### Vue（useTheme.js）

```js
import { ref, watch } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') ?? 'dark')
  watch(theme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
    localStorage.setItem('theme', val)
  }, { immediate: true })
  const toggle = () => { theme.value = theme.value === 'dark' ? 'light' : 'dark' }
  return { theme, toggle }
}
```

---

## ルーティング

### React（React Router v7）

```jsx
// main.jsx
import { BrowserRouter } from 'react-router-dom'
// App.jsx
import { Routes, Route } from 'react-router-dom'

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/works/:id" element={<WorkDetail />} />
</Routes>
```

### Vue（Vue Router v4）

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../pages/HomePage.vue') },
    { path: '/works/:id', component: () => import('../pages/WorkDetail.vue') },
  ],
})
export default router
```

---

## まとめ：どちらを選ぶか

| 状況 | おすすめ |
|------|---------|
| JSをしっかり学びたい | React |
| 直感的に書きたい | Vue |
| 授業でVueを学んだ | Vue でいい |
| 大手Web企業への就職を目指す | React有利 |
| ゲーム会社のWeb部門 | どちらでも可 |

**大切なのは「完成させること」です。**

---

## 次のステップ

→ [第7章：デプロイ](./07_deployment.md)
