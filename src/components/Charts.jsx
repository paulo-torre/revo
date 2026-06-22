import './Charts.css'

export function BarChart({ values, labels = [], goal }) {
  const maxValue = Math.max(...values, goal ?? 0)
  const goalPosition = goal ? `${(goal / maxValue) * 100}%` : '0%'

  return (
    <div className="bar-chart" style={{ '--bar-count': values.length }} aria-label="Histórico semanal">
      <div className="bar-chart-plot" style={{ '--goal-position': goalPosition }}>
        {goal && <span className="bar-chart-goal-line" aria-hidden="true" />}
        {values.map((value, index) => {
          const reachedGoal = goal ? value >= goal : true

          return (
            <div className="bar-chart-item" key={`${value}-${index}`}>
              <span
                className={`bar-chart-bar ${reachedGoal ? 'goal-reached' : 'goal-missed'}`}
                style={{ height: `${Math.max((value / maxValue) * 100, 18)}%` }}
              />
            </div>
          )
        })}
      </div>
      <div className="bar-chart-axis" aria-hidden="true">
        {values.map((value, index) => (
          <small key={`${value}-${index}`}>{labels[index]}</small>
        ))}
      </div>
    </div>
  )
}
