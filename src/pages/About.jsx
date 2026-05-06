export default function About() {
  return (
    <div className="about-page">
      <h1>关于我</h1>
      <div className="about-card">
        <div className="about-avatar">👨‍💻</div>
        <h2>一个热爱编程的开发者</h2>
        <p>
          你好！欢迎来到我的个人博客。我是一名前端开发者，
          热衷于探索新技术、分享开发经验。
        </p>
        <div className="about-info">
          <div className="info-item">
            <span className="info-label">兴趣</span>
            <span>前端开发 / 开源 / 阅读</span>
          </div>
          <div className="info-item">
            <span className="info-label">技术栈</span>
            <span>React / TypeScript / Node.js</span>
          </div>
          <div className="info-item">
            <span className="info-label">座右铭</span>
            <span>保持好奇，持续学习</span>
          </div>
        </div>
        <div className="about-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  )
}
