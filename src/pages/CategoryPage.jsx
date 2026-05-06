import { useMemo } from 'react'
import { usePosts } from '../hooks/usePosts'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function CategoryPage() {
  const { posts } = usePosts()
  const { id } = useParams()

  // 获取所有分类
  const categories = {}
  posts.forEach(post => {
    if (!categories[post.category]) {
      categories[post.category] = []
    }
    categories[post.category].push(post)
  })

  const categoryMap = {
    '生活': '日常生活',
    '技术': '技术文档',
    '学习': '学习笔记',
    '随笔': '瞬间',
  }

  // 根据URL参数过滤
  const filteredPosts = useMemo(() => {
    if (!id || id === 'all') {
      return posts
    }

    const categoryMap = {
      'life': '生活',
      'tech': '技术',
      'study': '学习',
      'moment': '随笔',
      'album': '生活',
      'guestbook': '生活',
      'friends': '技术',
      'about': '生活',
    }

    const categoryName = categoryMap[id]
    if (categoryName) {
      return posts.filter(p => p.category === categoryName)
    }

    return posts
  }, [posts, id])

  // 如果是单个分类页面，显示该分类的文章
  if (id && id !== 'all') {
    const categoryName = Object.entries(categoryMap).find(([_, name]) =>
      name === categoryMap[id] ||
      (id === 'moment' && name === '瞬间') ||
      (id === 'album' && name === '生活')
    )?.[1] || id

    return (
      <div className="category-page">
        <h1>{categoryName}</h1>
        <div className="posts-list">
          {filteredPosts.length > 0 ? (
            filteredPosts
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(post => (
                <div key={post.id} className="post-item">
                  <Link to={`/post/${post.id}`} className="post-title">
                    {post.title}
                  </Link>
                  <p className="post-summary">{post.summary}</p>
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span className="post-category">{post.category}</span>
                    <div className="post-tags">
                      {post.tags.map(tag => (
                        <Link key={tag} to={`/tags?tag=${tag}`} className="tag">{tag}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p className="no-posts">该分类下暂无文章</p>
          )}
        </div>
      </div>
    )
  }

  // 如果是分类列表页面，显示所有分类
  return (
    <div className="category-page">
      <h1>文章分类</h1>
      <div className="categories-grid">
        {Object.entries(categories).map(([category, categoryPosts]) => {
          const displayName = categoryMap[category] || category
          return (
            <div key={category} className="category-card">
              <h2>
                <span className="category-icon">📁</span>
                {displayName}
                <span className="count">({categoryPosts.length})</span>
              </h2>
              <ul className="category-posts">
                {categoryPosts
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(post => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                      <span className="post-date">{post.date}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}