import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import posts from '../data/posts'

export default function Tags() {
  const [searchParams] = useSearchParams()
  const selectedTag = searchParams.get('tag')

  const tagsMap = useMemo(() => {
    const map = {}
    posts.forEach(p => {
      p.tags.forEach(t => {
        if (!map[t]) map[t] = []
        map[t].push(p)
      })
    })
    return map
  }, [])

  const filteredPosts = selectedTag ? (tagsMap[selectedTag] || []) : []

  return (
    <div className="tags-page">
      <h1>标签</h1>
      <div className="tag-cloud">
        {Object.entries(tagsMap).map(([tag, tagPosts]) => (
          <Link
            key={tag}
            to={`/tags?tag=${tag}`}
            className={`tag ${selectedTag === tag ? 'tag-active' : ''}`}
          >
            {tag} ({tagPosts.length})
          </Link>
        ))}
      </div>
      {selectedTag && (
        <div className="tag-posts">
          <h2>标签「{selectedTag}」下的文章</h2>
          <ul>
            {filteredPosts.map(p => (
              <li key={p.id}>
                <Link to={`/post/${p.id}`}>{p.title}</Link>
                <span className="post-date-small">{p.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
