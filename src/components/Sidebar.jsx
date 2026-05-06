import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'

export default function Sidebar() {
  const { posts } = usePosts()

  // 获取热门文章（按置顶优先，然后按日期排序）
  const hotPosts = [...posts]
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.date) - new Date(a.date)
    })
    .slice(0, 5)

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>🔥 热门文章</h3>
        <div className="post-list-sidebar">
          {hotPosts.map(post => (
            <div key={post.id} className="sidebar-post-item">
              <Link to={`/post/${post.id}`} className="sidebar-post-title">
                {post.pinned && <span className="sidebar-pinned">置顶</span>}
                {post.title}
              </Link>
              <div className="sidebar-meta">
                <span className="sidebar-date">{post.date}</span>
                <span className="sidebar-category">{post.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>📝 最新文章</h3>
        <div className="post-list-sidebar">
          {recentPosts.map(post => (
            <div key={post.id} className="sidebar-post-item">
              <Link to={`/post/${post.id}`} className="sidebar-post-title">
                {post.title}
              </Link>
              <div className="sidebar-meta">
                <span className="sidebar-date">{post.date}</span>
                <span className="sidebar-category">{post.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>🏷️ 标签云</h3>
        <div className="tag-cloud-sidebar">
          {Array.from(
            new Set(posts.flatMap(p => p.tags))
          )
            .sort()
            .map(tag => (
              <Link
                key={tag}
                to={`/tags?tag=${tag}`}
                className="tag-cloud-item"
              >
                {tag}
              </Link>
            ))}
        </div>
      </div>
    </aside>
  )
}
