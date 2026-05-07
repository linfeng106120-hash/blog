import { useState } from 'react'

export default function About() {
  const [aboutInfo, setAboutInfo] = useState({
    name: 'KKOO',
    title: '前端开发工程师',
    avatar: '👨‍💻',
    bio: '一名热爱编程的开发者，热衷于探索新技术、分享开发经验。',
    interests: '前端开发 / 开源 / 阅读',
    techStack: 'React / TypeScript / Node.js',
    motto: '保持好奇，持续学习',
    email: 'your-email@example.com',
    wechat: 'your-wechat-id',
    github: 'https://github.com',
    location: '北京',
    experience: '5年',
    projects: '10+'
  })

  const [editing, setEditing] = useState(false)
  const [tempInfo, setTempInfo] = useState({ ...aboutInfo })

  const handleSave = () => {
    setAboutInfo({ ...tempInfo })
    setEditing(false)
  }

  const handleCancel = () => {
    setTempInfo({ ...aboutInfo })
    setEditing(false)
  }

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>👤 关于我</h1>
        {!editing && (
          <button className="edit-btn" onClick={() => setEditing(true)}>
            ✏️ 编辑资料
          </button>
        )}
      </div>

      <div className="about-content">
        <div className="about-card">
          {/* 头像和基本信息 */}
          <div className="profile-section">
            <div className="avatar-section">
              <div className="about-avatar">{aboutInfo.avatar}</div>
              {editing && (
                <div className="avatar-edit">
                  <input
                    type="text"
                    value={tempInfo.avatar}
                    onChange={(e) => setTempInfo({...tempInfo, avatar: e.target.value})}
                    placeholder="输入头像emoji"
                  />
                </div>
              )}
            </div>

            {editing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>姓名</label>
                  <input
                    type="text"
                    value={tempInfo.name}
                    onChange={(e) => setTempInfo({...tempInfo, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>职位</label>
                  <input
                    type="text"
                    value={tempInfo.title}
                    onChange={(e) => setTempInfo({...tempInfo, title: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>个人简介</label>
                  <textarea
                    value={tempInfo.bio}
                    onChange={(e) => setTempInfo({...tempInfo, bio: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <h2>{aboutInfo.name}</h2>
                <p className="title">{aboutInfo.title}</p>
                <p className="bio">{aboutInfo.bio}</p>
              </div>
            )}
          </div>

          {/* 详细信息 */}
          <div className="about-details">
            <div className="details-section">
              <h3>🎯 基本信息</h3>
              {editing ? (
                <div className="detail-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>兴趣</label>
                      <input
                        type="text"
                        value={tempInfo.interests}
                        onChange={(e) => setTempInfo({...tempInfo, interests: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>经验</label>
                      <input
                        type="text"
                        value={tempInfo.experience}
                        onChange={(e) => setTempInfo({...tempInfo, experience: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>项目</label>
                      <input
                        type="text"
                        value={tempInfo.projects}
                        onChange={(e) => setTempInfo({...tempInfo, projects: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>所在地</label>
                      <input
                        type="text"
                        value={tempInfo.location}
                        onChange={(e) => setTempInfo({...tempInfo, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>技术栈</label>
                    <input
                      type="text"
                      value={tempInfo.techStack}
                      onChange={(e) => setTempInfo({...tempInfo, techStack: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">兴趣</span>
                    <span>{aboutInfo.interests}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">技术栈</span>
                    <span>{aboutInfo.techStack}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">所在地</span>
                    <span>{aboutInfo.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">工作经验</span>
                    <span>{aboutInfo.experience}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">参与项目</span>
                    <span>{aboutInfo.projects}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">座右铭</span>
                    <span>{aboutInfo.motto}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="contact-section">
              <h3>📬 联系方式</h3>
              {editing ? (
                <div className="contact-form">
                  <div className="form-group">
                    <label>邮箱</label>
                    <input
                      type="email"
                      value={tempInfo.email}
                      onChange={(e) => setTempInfo({...tempInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>微信</label>
                    <input
                      type="text"
                      value={tempInfo.wechat}
                      onChange={(e) => setTempInfo({...tempInfo, wechat: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>GitHub</label>
                    <input
                      type="url"
                      value={tempInfo.github}
                      onChange={(e) => setTempInfo({...tempInfo, github: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <div className="contact-list">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <a href={`mailto:${aboutInfo.email}`} className="contact-link">
                      {aboutInfo.email}
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">💬</span>
                    <span className="contact-text">{aboutInfo.wechat}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">💻</span>
                    <a href={aboutInfo.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                      GitHub
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          {editing && (
            <div className="form-actions">
              <button className="save-btn" onClick={handleSave}>
                💾 保存
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                ❌ 取消
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
