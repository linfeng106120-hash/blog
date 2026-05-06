import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { dark, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'life', name: '日常生活' },
    { id: 'tech', name: '技术文档' },
    { id: 'study', name: '学习笔记' },
    { id: 'moment', name: '瞬间' },
    { id: 'album', name: '相册' },
    { id: 'guestbook', name: '留言板' },
    { id: 'friends', name: '友链' },
    { id: 'about', name: '关于' },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">My Blog</Link>
        <div className="nav-links">
          <Link to="/" className={isActive('/')}>首页</Link>
          <Link to="/" className={isActive('/')}>全部</Link>
          <Link to="/category/life" className={isActive('/category/life')}>日常生活</Link>
          <Link to="/category/tech" className={isActive('/category/tech')}>技术文档</Link>
          <Link to="/category/study" className={isActive('/category/study')}>学习笔记</Link>
          <Link to="/moment" className={isActive('/moment')}>瞬间</Link>
          <Link to="/album" className={isActive('/album')}>相册</Link>
          <Link to="/guestbook" className={isActive('/guestbook')}>留言板</Link>
          <Link to="/category/friends" className={isActive('/category/friends')}>友链</Link>
          <Link to="/category/about" className={isActive('/category/about')}>关于</Link>
          <button className="theme-toggle" onClick={toggleTheme} title={dark ? '切换亮色' : '切换暗色'}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}
