import { useState } from 'react'

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments-${postId}`)
    return saved ? JSON.parse(saved) : []
  })
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    const newComment = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString('zh-CN'),
    }
    const updated = [newComment, ...comments]
    setComments(updated)
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updated))
    setName('')
    setText('')
  }

  const handleDelete = (id) => {
    const updated = comments.filter(c => c.id !== id)
    setComments(updated)
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updated))
  }

  return (
    <div className="comment-section">
      <h3>评论 ({comments.length})</h3>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="你的名字"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          placeholder="写下你的评论..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
        />
        <button type="submit">发表评论</button>
      </form>
      <div className="comment-list">
        {comments.map(c => (
          <div key={c.id} className="comment-item">
            <div className="comment-header">
              <strong>{c.name}</strong>
              <span className="comment-date">{c.date}</span>
              <button className="comment-delete" onClick={() => handleDelete(c.id)}>删除</button>
            </div>
            <p>{c.text}</p>
          </div>
        ))}
        {comments.length === 0 && <p className="no-comments">暂无评论，来抢沙发吧！</p>}
      </div>
    </div>
  )
}
