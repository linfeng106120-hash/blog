import { useState } from 'react'

export default function GuestbookPage() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('guestbook-messages')
    return saved ? JSON.parse(saved) : []
  })
  const [newMessage, setNewMessage] = useState({
    name: '',
    email: '',
    content: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newMessage.name.trim() || !newMessage.content.trim()) {
      alert('请填写姓名和留言内容')
      return
    }

    const message = {
      id: Date.now(),
      ...newMessage,
      date: new Date().toLocaleString('zh-CN'),
      reply: null
    }

    setMessages(prev => [message, ...prev])
    localStorage.setItem('guestbook-messages', JSON.stringify([message, ...messages]))
    setNewMessage({ name: '', email: '', content: '' })
  }

  const handleReply = (id, reply) => {
    if (!reply.trim()) return

    setMessages(prev => prev.map(msg =>
      msg.id === id ? { ...msg, reply: { content: reply, date: new Date().toLocaleString('zh-CN') } } : msg
    ))

    const updatedMessages = messages.map(msg =>
      msg.id === id ? { ...msg, reply: { content: reply, date: new Date().toLocaleString('zh-CN') } } : msg
    )
    localStorage.setItem('guestbook-messages', JSON.stringify(updatedMessages))
  }

  return (
    <div className="guestbook-page">
      <h1>💬 留言板</h1>
      <p>欢迎在这里留下你的想法和建议</p>

      {/* 留言表单 */}
      <div className="message-form">
        <h3>我要留言</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="你的昵称"
              value={newMessage.name}
              onChange={e => setNewMessage({...newMessage, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="邮箱地址（可选）"
              value={newMessage.email}
              onChange={e => setNewMessage({...newMessage, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="写下你的留言..."
              value={newMessage.content}
              onChange={e => setNewMessage({...newMessage, content: e.target.value})}
              rows={4}
              required
            />
          </div>
          <button type="submit">发布留言</button>
        </form>
      </div>

      {/* 留言列表 */}
      <div className="messages-list">
        {messages.length > 0 ? (
          messages.map(message => (
            <div key={message.id} className="message-item">
              <div className="message-header">
                <strong>{message.name}</strong>
                <span className="message-date">{message.date}</span>
              </div>
              <p className="message-content">{message.content}</p>

              {message.reply && (
                <div className="message-reply">
                  <div className="reply-header">
                    <span>博主回复：</span>
                    <span className="reply-date">{message.reply.date}</span>
                  </div>
                  <p className="reply-content">{message.reply.content}</p>
                </div>
              )}

              {!message.reply && (
                <div className="reply-form">
                  <textarea
                    placeholder="回复留言..."
                    rows={2}
                    id={`reply-${message.id}`}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById(`reply-${message.id}`)
                      if (input.value.trim()) {
                        handleReply(message.id, input.value.trim())
                        input.value = ''
                      }
                    }}
                  >
                    回复
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-messages">
            <p>还没有留言，来做第一个留言的人吧！</p>
          </div>
        )}
      </div>
    </div>
  )
}