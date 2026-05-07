import { usePosts } from '../hooks/usePosts'
import PostCard from './PostCard'

export default function PopularPosts() {
  const { posts } = usePosts()

  // 简化：直接显示所有文章作为热门
  const popularPosts = posts.slice(0, 5)

  if (popularPosts.length === 0) {
    return null
  }

  return (
    <div className="popular-posts">
      <h3 className="section-title">热门文章</h3>
      <div className="popular-posts-list">
        {popularPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={() => {}}
            compact={true}
          />
        ))}
      </div>
    </div>
  )
}