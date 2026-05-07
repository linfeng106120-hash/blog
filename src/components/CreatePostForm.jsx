import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'

export default function CreatePostForm({ post, onCancel, onSave, isEdit = false }) {
  const { addPost, updatePost } = usePosts()
  const [formData, setFormData] = useState({
    title: post?.title || '',
    summary: post?.summary || '',
    content: post?.content || '',
    category: post?.category || '技术',
    tags: post?.tags?.join(', ') || '',
    pinned: post?.pinned || false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = '请输入标题'
    if (!formData.summary.trim()) newErrors.summary = '请输入摘要'
    if (!formData.content.trim()) newErrors.content = '请输入内容'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const postPayload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      }

      if (isEdit) {
        await updatePost(post.id, postPayload)
        // 保存后关闭编辑模式
        onSave(postPayload)
      } else {
        const newPost = await addPost(postPayload)
        onSave(newPost)
      }
    } catch (error) {
      setErrors({ submit: '保存失败，请重试' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = ['技术', '生活', '随笔', '学习', '工作', '友链', '关于']

  return (
    <div className="edit-modal">
      <div className="edit-content">
        <h3>{isEdit ? '编辑文章' : '新建文章'}</h3>
        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>标题</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
            {errors.title && <div className="error-text">{errors.title}</div>}
          </div>
          <div className="form-group">
            <label>摘要</label>
            <input
              type="text"
              value={formData.summary}
              onChange={e => setFormData({...formData, summary: e.target.value})}
              required
            />
            {errors.summary && <div className="error-text">{errors.summary}</div>}
          </div>
          <div className="form-group">
            <label>分类</label>
            <select
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
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
            {errors.content && <div className="error-text">{errors.content}</div>}
          </div>
          <div className="form-actions">
            {isEdit && (
              <div className="pin-toggle">
                <input
                  type="checkbox"
                  id="pinned"
                  checked={formData.pinned}
                  onChange={e => setFormData({...formData, pinned: e.target.checked})}
                />
                <label htmlFor="pinned">置顶</label>
              </div>
            )}
            <div className="button-group">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {isEdit ? '取消编辑' : '取消'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '保存中...' : (isEdit ? '保存修改' : '发布')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
