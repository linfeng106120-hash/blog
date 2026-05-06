import { useState, useMemo } from 'react'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/PostCard'
import CreatePostForm from '../components/CreatePostForm'
import Sidebar from '../components/Sidebar'

export default function Home() {
  const { posts } = usePosts()
  const [search, setSearch] = useState('')
  const [editingPost, setEditingPost] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('all')

  // 获取所有分类
  const categories = {
    all: '全部',
    life: '日常生活',
    tech: '技术文档',
    study: '学习笔记',
    moment: '瞬间',
    album: '相册',
    guestbook: '留言板',
    friends: '友链',
    about: '关于',
  }

  // 过滤文章
  const filtered = useMemo(() => {
    let result = posts

    // 按分类过滤
    if (currentCategory !== 'all') {
      const categoryMap = {
        life: '生活',
        tech: '技术',
        study: '学习',
        moment: '随笔',
        album: '生活',
        guestbook: '生活',
        friends: '技术',
        about: '生活',
      }
      const categoryName = categoryMap[currentCategory]
      if (categoryName) {
        result = result.filter(p => p.category === categoryName)
      }
    }

    // 按搜索过滤
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // 排序：置顶优先，然后按日期
    return result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.date) - new Date(a.date)
    })
  }, [search, posts, currentCategory])

  const handleEdit = (post) => {
    setEditingPost(post)
  }

  const handleEditSave = () => {
    setEditingPost(null)
    // 强制刷新列表
    window.location.reload()
  }

  const handleEditCancel = () => {
    setEditingPost(null)
  }

  const handleCreateSave = () => {
    setShowCreate(false)
    // 强制刷新列表
    window.location.reload()
  }

  const handleCreateCancel = () => {
    setShowCreate(false)
  }

  return (
    <div className="home">
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-content">
          <h1>kkoo的日常生活</h1>
          <p>记录每一天的美好时光，分享生活的点点滴滴</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Category Navigation - Main Categories Only */}
        <div className="category-nav">
          {Object.entries(categories)
            .filter(([key]) => ['all', 'life', 'tech', 'study'].includes(key))
            .map(([key, name]) => (
              <button
                key={key}
                className={`category-btn ${currentCategory === key ? 'active' : ''}`}
                onClick={() => setCurrentCategory(key)}
              >
                {name}
              </button>
            ))}
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="搜索文章..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          <div className="posts-container">
            {filtered.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
              />
            ))}
            {filtered.length === 0 && (
              <div className="no-posts">
                <p>没有找到相关文章</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>

        {/* Create/Edit Modals */}
        {editingPost && (
          <CreatePostForm
            post={editingPost}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
            isEdit={true}
          />
        )}

        {showCreate && (
          <CreatePostForm
            onSave={handleCreateSave}
            onCancel={handleCreateCancel}
          />
        )}
      </div>
    </div>
  )
}