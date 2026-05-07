import { useState, useEffect, useMemo } from 'react'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/PostCard'
import CreatePostForm from '../components/CreatePostForm'
import PopularPosts from '../components/PopularPosts'

export default function Home() {
  const { posts, updatePost } = usePosts()
  const [search, setSearch] = useState('')
  const [editingPost, setEditingPost] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('all')

  // 调试：检查posts是否正确加载
  console.log('Posts loaded:', posts)

  // 监听posts变化，确保界面自动更新
  useEffect(() => {
    // 当posts变化时，确保编辑状态被清除
    if (editingPost && !posts.find(p => p.id === editingPost.id)) {
      setEditingPost(null)
    }
  }, [posts, editingPost])

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
  }, [search, posts])

  const handleEdit = (post) => {
    setEditingPost(post)
  }

  const handleEditSave = (updatedPost) => {
    setEditingPost(null)
    // 更新当前编辑的文章，确保界面显示最新状态
    if (updatedPost) {
      // 可以在这里添加额外的处理逻辑
    }
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

          {/* Popular Posts */}
          <PopularPosts />
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