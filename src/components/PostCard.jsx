import { Link } from 'react-router-dom'

export default function PostCard({ post, onEdit }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span className="post-date">{post.date}</span>
        <span className="post-category">{post.category}</span>
        {post.pinned && <span className="pinned-badge">置顶</span>}
      </div>
      <h2 className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="post-summary">{post.summary}</p>
      <div className="post-tags">
        {post.tags.map(tag => (
          <Link key={tag} to={`/tags?tag=${tag}`} className="tag">{tag}</Link>
        ))}
      </div>
      {onEdit && (
        <button className="edit-btn" onClick={() => onEdit(post)}>
          编辑
        </button>
      )}
    </article>
  )
}