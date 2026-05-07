import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'

export default function MomentsPage() {
  const { posts } = usePosts()

  // 获取所有类型的文章（包括日常生活、技术文档、学习笔记）
  const allMoments = posts.filter(p => ['生活', '技术', '学习'].includes(p.category))

  // 获取随笔类型的文章（原来的瞬间）
  const moments = posts.filter(p => p.category === '随笔')

  // 按日期分组所有内容
  const allMomentsByDate = {}
  allMoments.forEach(moment => {
    const date = moment.date
    if (!allMomentsByDate[date]) {
      allMomentsByDate[date] = []
    }
    allMomentsByDate[date].push(moment)
  })

  // 按日期分组瞬间
  const momentsByDate = {}
  moments.forEach(moment => {
    const date = moment.date
    if (!momentsByDate[date]) {
      momentsByDate[date] = []
    }
    momentsByDate[date].push(moment)
  })

  // 当前显示的年月
  const [currentDate, setCurrentDate] = useState(new Date())

  // 生成日历数据
  const generateCalendar = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    // 获取当月第一天和最后一天
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // 获取第一天是星期几（0 = 周日, 6 = 周六）
    const firstDayOfWeek = firstDay.getDay()

    // 获取最后一天是星期几
    const lastDayOfWeek = lastDay.getDay()

    // 生成日历数组
    const calendar = []

    // 添加上个月的最后几天
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayMoments = momentsByDate[dateStr] || []
      const dayAllMoments = allMomentsByDate[dateStr] || []

      calendar.push({
        date: dateStr,
        day: date.getDate(),
        isCurrentMonth: false,
        isToday: false,
        moments: dayMoments,
        allMoments: dayAllMoments,
        momentCount: dayMoments.length,
        allMomentCount: dayAllMoments.length,
        hasMoments: dayMoments.length > 0,
        hasAllMoments: dayAllMoments.length > 0
      })
    }

    // 添加当月的所有天
    const today = new Date()
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      const dateStr = date.toISOString().split('T')[0]

      // 获取当天的所有内容（包括生活、技术、学习和随笔）
      const dayMoments = momentsByDate[dateStr] || []
      const dayAllMoments = allMomentsByDate[dateStr] || []

      calendar.push({
        date: dateStr,
        day: i,
        isCurrentMonth: true,
        isToday: dateStr === today.toISOString().split('T')[0],
        moments: dayMoments,
        allMoments: dayAllMoments,
        momentCount: dayMoments.length,
        allMomentCount: dayAllMoments.length,
        hasMoments: dayMoments.length > 0,
        hasAllMoments: dayAllMoments.length > 0
      })
    }

    // 添加下个月的前几天（补齐42个格子）
    const remainingCells = 42 - calendar.length
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i)
      const dateStr = date.toISOString().split('T')[0]
      const dayMoments = momentsByDate[dateStr] || []
      const dayAllMoments = allMomentsByDate[dateStr] || []

      calendar.push({
        date: dateStr,
        day: i,
        isCurrentMonth: false,
        isToday: false,
        moments: dayMoments,
        allMoments: dayAllMoments,
        momentCount: dayMoments.length,
        allMomentCount: dayAllMoments.length,
        hasMoments: dayMoments.length > 0,
        hasAllMoments: dayAllMoments.length > 0
      })
    }

    return calendar
  }

  const calendarData = generateCalendar(currentDate)
  const [selectedDate, setSelectedDate] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  // 月份切换函数
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  return (
    <div className="moments-page">
      <div className="moments-header">
        <h1>🌟 瞬间</h1>
        <p>记录生活中的美好瞬间</p>
      </div>

      {/* 日历视图 */}
      <div className="calendar-view">
        {/* 日历头部 - 包含月份切换 */}
        <div className="calendar-header">
          <button
            className="month-nav-btn"
            onClick={() => changeMonth(-1)}
            aria-label="上个月"
          >
            &lt;
          </button>
          <h2>{currentDate.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}</h2>
          <button
            className="month-nav-btn"
            onClick={() => changeMonth(1)}
            aria-label="下个月"
          >
            &gt;
          </button>
        </div>

        {/* 星期几标题 */}
        <div className="weekdays">
          {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>

        {/* 日历网格 - 竖向长矩形布局 */}
        <div className="calendar-grid-vertical">
          {calendarData.map((dayData, index) => {
            return (
              <div
                key={dayData.date}
                className={`calendar-day-vertical ${!dayData.isCurrentMonth ? 'other-month' : ''} ${dayData.hasAllMoments ? 'has-moment' : ''} ${dayData.isToday ? 'today' : ''}`}
                onClick={() => dayData.isCurrentMonth && setSelectedDate(dayData.date)}
              >
                <div className="day-content">
                  <div className="day-number">
                    {dayData.day}
                  </div>

                  {/* 显示当天的总记录数 */}
                  {dayData.hasAllMoments && (
                    <div className="moment-info">
                      <div className="all-moments-count">
                        {dayData.allMomentCount} 条记录
                      </div>

                      {/* 显示分类统计 */}
                      <div className="category-stats">
                        {dayData.allMoments.filter(m => m.category === '生活').length > 0 && (
                          <div className="category-stat">
                            <span className="category-icon">🌱</span>
                            <span>{dayData.allMoments.filter(m => m.category === '生活').length}</span>
                          </div>
                        )}
                        {dayData.allMoments.filter(m => m.category === '技术').length > 0 && (
                          <div className="category-stat">
                            <span className="category-icon">💻</span>
                            <span>{dayData.allMoments.filter(m => m.category === '技术').length}</span>
                          </div>
                        )}
                        {dayData.allMoments.filter(m => m.category === '学习').length > 0 && (
                          <div className="category-stat">
                            <span className="category-icon">📚</span>
                            <span>{dayData.allMoments.filter(m => m.category === '学习').length}</span>
                          </div>
                        )}
                        {dayData.momentCount > 0 && (
                          <div className="category-stat">
                            <span className="category-icon">✨</span>
                            <span>{dayData.momentCount}</span>
                          </div>
                        )}
                      </div>

                      {/* 显示最新内容的标题 */}
                      {dayData.allMoments.length > 0 && (
                        <div className="moment-preview">
                          <div className="moment-title">
                            {dayData.allMoments[0].title}
                          </div>
                          <div className="moment-meta">
                            <span className="category-type">
                              {dayData.allMoments[0].category === '生活' ? '🌱 生活' :
                               dayData.allMoments[0].category === '技术' ? '💻 技术' :
                               dayData.allMoments[0].category === '学习' ? '📚 学习' : '✨ 随笔'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 选中日期的内容列表 */}
      {selectedDate && (
        <div className="moments-list">
          <div className="selected-date">
            <div className="selected-date-header">
              <h3>{selectedDate}</h3>
              <button onClick={() => setSelectedDate(null)}>×</button>
            </div>
            <div className="date-summary">
              共 <span className="highlight">{allMomentsByDate[selectedDate]?.length || 0}</span> 条记录
              {momentsByDate[selectedDate]?.length > 0 && (
                <span className="summary-detail">，其中 <span className="highlight">{momentsByDate[selectedDate].length}</span> 篇随笔</span>
              )}
            </div>
          </div>
          <div className="moments-tabs">
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              全部内容
            </button>
            <button
              className={`tab-btn ${activeTab === 'moments' ? 'active' : ''}`}
              onClick={() => setActiveTab('moments')}
            >
              随笔瞬间
            </button>
          </div>
          <div className="moments-content">
            {(activeTab === 'all' ? (allMomentsByDate[selectedDate] || []) : (momentsByDate[selectedDate] || [])).map(item => (
              <div key={item.id} className="moment-item">
                <div className="moment-header">
                  <div className="moment-category">
                    {item.category === '生活' ? '🌱 生活' :
                     item.category === '技术' ? '💻 技术' :
                     item.category === '学习' ? '📚 学习' : '✨ 随笔'}
                  </div>
                  <div className="moment-time">
                    {item.date}
                  </div>
                </div>
                <h4>{item.title}</h4>
                <p>{item.summary}</p>
                <div className="moment-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="moment-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
            {((activeTab === 'all' ? allMomentsByDate[selectedDate] : momentsByDate[selectedDate])?.length || 0) === 0 && (
              <p className="no-moments">
                {activeTab === 'all' ? '这一天还没有记录任何内容' : '这一天还没有记录任何瞬间'}
              </p>
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

      {/* 快速添加按钮 */}
      <div className="quick-add-container">
        <button
          className="quick-add-btn"
          onClick={() => {
            // 这里可以添加创建新瞬间的逻辑
            alert('创建新瞬间功能待实现')
          }}
        >
          ✨ 记录新瞬间
        </button>
      </div>
    </div>
  )
}