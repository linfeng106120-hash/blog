import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'

export default function EditPostForm({ post, onCancel, onSave }) {
  const { updatePost, togglePin } = usePosts()
  const [formData, setFormData] = useState({
    title: post.title,
    summary: post.summary,
    content: post.content,
    category: post.category,
    tags: post.tags.join(', '),
    pinned: post.pinned,
  })
  const [isPinned, setIsPinned] = useState(post.pinned)

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedPost = {
      ...post,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    }
    updatePost(post.id, updatedPost)
    onSave(updatedPost)
  }

  const handlePin = () => {
    togglePin(post.id)
    setIsPinned(!isPinned)
  }

  return (
    <div className="edit-modal">
      <div className="edit-content">
        <h3>编辑文章</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>标题</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>摘要</label>
            <input
              type="text"
              value={formData.summary}
              onChange={e => setFormData({...formData, summary: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>分类</label>
            <input
              type="text"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>标签（用逗号分隔）</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
              placeholder="例如: React, 前端, 技巧"
            />
          </div>
          <div className="form-group">
            <label>内容</label>
            <textarea
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              rows={10}
              required
            />
          </div>
          <div className="form-actions">
            <div className="pin-toggle">
              <input
                type="checkbox"
                id="pinned"
                checked={isPinned}
                onChange={handlePin}
              />
              <label htmlFor="pinned">置顶</label>
            </div>
            <div className="button-group">
              <button type="button" onClick={onCancel}>取消</button>
              <button type="submit">保存</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
