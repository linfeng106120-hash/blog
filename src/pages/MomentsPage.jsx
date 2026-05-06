import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'

export default function MomentsPage() {
  const { posts } = usePosts()

  // 获取瞬间类型的文章
  const moments = posts.filter(p => p.category === '随笔')

  // 按日期分组
  const momentsByDate = {}
  moments.forEach(moment => {
    const date = moment.date
    if (!momentsByDate[date]) {
      momentsByDate[date] = []
    }
    momentsByDate[date].push(moment)
  })

  // 获取最近30天的日期
  const getLast30Days = () => {
    const dates = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const last30Days = getLast30Days()
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div className="moments-page">
      <h1>🌟 瞬间</h1>
      <p>记录生活中的美好瞬间</p>

      {/* 日历视图 */}
      <div className="calendar-view">
        <div className="calendar-grid">
          {last30Days.map(date => {
            const dayMoments = momentsByDate[date] || []
            const hasMoments = dayMoments.length > 0
            const isToday = date === new Date().toISOString().split('T')[0]

            return (
              <div
                key={date}
                className={`calendar-day ${hasMoments ? 'has-moment' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="day-number">
                  {new Date(date).getDate()}
                </div>
                {hasMoments && (
                  <div className="day-indicator">
                    {dayMoments.length}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 选中日期的瞬间列表 */}
      {selectedDate && (
        <div className="moments-list">
          <div className="selected-date">
            <h3>{selectedDate}</h3>
            <button onClick={() => setSelectedDate(null)}>×</button>
          </div>
          <div className="moments-content">
            {(momentsByDate[selectedDate] || []).map(moment => (
              <div key={moment.id} className="moment-item">
                <h4>{moment.title}</h4>
                <p>{moment.summary}</p>
                <div className="moment-tags">
                  {moment.tags.map(tag => (
                    <span key={tag} className="moment-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
            {(!momentsByDate[selectedDate] || momentsByDate[selectedDate].length === 0) && (
              <p className="no-moments">这一天还没有记录任何瞬间</p>
            )}
          </div>
        </div>
      )}

      {!selectedDate && moments.length === 0 && (
        <div className="no-moments">
          <p>还没有任何瞬间记录</p>
          <p>记录下生活中那些美好的时刻吧！</p>
        </div>
      )}
    </div>
  )
}