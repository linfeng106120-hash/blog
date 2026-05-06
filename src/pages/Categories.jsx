import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import posts from '../data/posts'

export default function Categories() {
  const categories = useMemo(() => {
    const map = {}
    posts.forEach(p => {
      if (!map[p.category]) map[p.category] = []
      map[p.category].push(p)
    })
    return map
  }, [])

  return (
    <div className="categories-page">
      <h1>分类</h1>
      <div className="category-list">
        {Object.entries(categories).map(([cat, catPosts]) => (
          <div key={cat} className="category-group">
            <h2>
              <span className="category-icon">📁</span>
              {cat}
              <span className="count">({catPosts.length})</span>
            </h2>
            <ul>
              {catPosts.map(p => (
                <li key={p.id}>
                  <Link to={`/post/${p.id}`}>{p.title}</Link>
                  <span className="post-date-small">{p.date}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
