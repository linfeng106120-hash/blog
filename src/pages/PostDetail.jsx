import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import CommentSection from '../components/CommentSection'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { posts } = usePosts()
  const post = posts.find(p => p.id === Number(id))

  if (!post) {
    return (
      <div className="not-found">
        <h2>文章不存在</h2>
        <Link to="/">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="post-detail">
      <Link to="/" className="back-link">← 返回首页</Link>
      <article>
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <span className="post-category">{post.category}</span>
          {post.pinned && <span className="pinned-badge">置顶</span>}
        </div>
        <h1>{post.title}</h1>
        <div className="post-tags">
          {post.tags.map(tag => (
            <Link key={tag} to={`/tags?tag=${tag}`} className="tag">{tag}</Link>
          ))}
        </div>
        <div className="post-content">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
            if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>
            if (line.startsWith('- ')) return <li key={i}>{line.slice(2)}</li>
            if (line.startsWith('```')) return null
            if (line.trim() === '') return <br key={i} />
            return <p key={i}>{line}</p>
          })}
        </div>
        <div className="post-actions">
          <button
            className="edit-btn-detail"
            onClick={() => navigate('/')}
          >
            编辑文章
          </button>
        </div>
      </article>
      <CommentSection postId={post.id} />
    </div>
  )
}
