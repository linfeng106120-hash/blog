import { useState, useEffect } from 'react'

const STORAGE_KEY = 'blog-posts'

const defaultPosts = [
  {
    id: 1,
    title: '我的第一篇博客',
    summary: '欢迎来到我的个人博客！这里是我记录思考和分享经验的地方。',
    content: `欢迎来到我的个人博客！

这是我的第一篇文章。在这里，我会分享关于编程、技术和生活的思考。

## 为什么写博客？

写博客是整理思路、沉淀知识的好方法。通过输出倒逼输入，让学习更有效率。

## 接下来的计划

- 分享技术学习笔记
- 记录项目开发经验
- 探讨有趣的编程话题

希望你能在这里找到有价值的内容！`,
    date: '2026-05-06',
    tags: ['随笔', '开始'],
    category: '生活',
    pinned: false,
  },
  {
    id: 2,
    title: 'React 开发实用技巧',
    summary: '总结一些在 React 项目开发中常用的技巧和最佳实践。',
    content: `在 React 开发中，有一些实用的技巧可以帮助我们写出更好的代码。

## 1. 使用自定义 Hook 复用逻辑

将组件中可复用的逻辑抽取为自定义 Hook，可以提高代码的可维护性。

## 2. 合理使用 useMemo 和 useCallback

不要过度优化，只在真正有性能问题时才使用 memo 化。

## 3. 组件拆分原则

保持组件职责单一，一个组件只做一件事。

## 4. 状态管理

小型项目用 useContext，大型项目考虑 Zustand 或 Redux Toolkit。

## 5. 错误边界

使用 ErrorBoundary 组件捕获渲染错误，提升用户体验。`,
    date: '2026-05-05',
    tags: ['React', '前端', '技巧'],
    category: '技术',
    pinned: false,
  },
  {
    id: 3,
    title: 'Vite 构建工具入门',
    summary: '快速了解 Vite 的核心概念和基本用法，感受极速开发体验。',
    content: `Vite 是新一代前端构建工具，以极速的开发体验著称。

## 为什么选择 Vite？

- **极速启动**：利用浏览器原生 ESM，无需打包即可启动
- **快速热更新**：HMR 速度不受项目规模影响
- **开箱即用**：支持 TypeScript、CSS Modules 等常见需求

## 创建项目

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`

## 核心特性

1. 开发环境下基于原生 ESM
2. 生产构建使用 Rollup
3. 丰富的插件生态

Vite 已经成为 React、Vue 等框架的首选构建工具。`,
    date: '2026-05-04',
    tags: ['Vite', '前端', '工具'],
    category: '技术',
    pinned: false,
  },
  {
    id: 4,
    title: '我的 2026 年读书清单',
    summary: '记录今年计划阅读的书籍，分享阅读心得。',
    content: `2026 年，给自己定了一个阅读目标。

## 技术类

- 《深入理解 TypeScript》
- 《设计模式》
- 《重构：改善既有代码的设计》

## 非技术类

- 《人类简史》
- 《思考，快与慢》
- 《原则》

阅读是性价比最高的学习方式，坚持每天至少读 30 分钟。`,
    date: '2026-05-03',
    tags: ['读书', '计划'],
    category: '生活',
    pinned: false,
  },
  {
    id: 5,
    title: '一个美丽的瞬间',
    summary: '记录生活中的美好瞬间，分享此刻的心情。',
    content: `今天看到了一个美丽的夕阳，忍不住记录下来。

## 那一刻

傍晚时分，天空被染成了金黄色。远处的云朵像棉花糖一样柔软。

这个瞬间让我想起了生活中许多美好的时刻：

- 和朋友们的欢声笑语
- 家人的温暖拥抱
- 工作完成的成就感

## 感悟

生活中不缺少美，只是缺少发现美的眼睛。`,
    date: '2026-05-02',
    tags: ['瞬间', '生活', '感悟'],
    category: '随笔',
    pinned: false,
  },
]

export function usePosts() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultPosts
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    }
    setPosts(prev => [newPost, ...prev])
    return newPost
  }

  const updatePost = (id, updates) => {
    setPosts(prev => prev.map(post =>
      post.id === id ? { ...post, ...updates } : post
    ))
  }

  const deletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id))
  }

  const togglePin = (id) => {
    setPosts(prev => prev.map(post =>
      post.id === id ? { ...post, pinned: !post.pinned } : post
    ))
  }

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    togglePin,
  }
}
