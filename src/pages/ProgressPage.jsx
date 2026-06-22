import { useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import { BarChart } from '../components/Charts'
import DesktopOnly from '../components/DesktopOnly'
import './ProgressPage.css'

const fallbackHistory = [
  {
    performance: 108,
    calories: 130,
    heartRate: 121,
    oxygen: 99,
    bloodPressure: '13 / 8',
    finishedAt: new Date().toISOString(),
  },
  {
    performance: 94,
    calories: 118,
    heartRate: 128,
    oxygen: 99,
    bloodPressure: '12 / 8',
    finishedAt: '2026-06-19T18:30:00.000Z',
  },
  {
    performance: 101,
    calories: 142,
    heartRate: 132,
    oxygen: 98,
    bloodPressure: '13 / 8',
    finishedAt: '2026-06-17T18:15:00.000Z',
  },
]

function ProgressPage() {
  const [isEditingGoals, setIsEditingGoals] = useState(false)
  const [currentWeight, setCurrentWeight] = useState(72)
  const [targetWeight, setTargetWeight] = useState(75)
  const history = getWorkoutHistory()
  const recentHistory = history.length > 0 ? history : fallbackHistory
  const totalCalories = recentHistory.reduce((total, item) => total + Number(item.calories || 0), 0)
  const averagePerformance = Math.round(
    recentHistory.reduce((total, item) => total + Number(item.performance || 0), 0) / recentHistory.length,
  )
  const weightHistory = [70.8, 71.1, 71.3, 71.7, currentWeight]
  const weightLabels = ['Mar', 'Abr', 'Mai', 'Jun', 'Atual']
  const safeTargetWeight = targetWeight || 1
  const weightProgress = Math.min(Math.round((currentWeight / safeTargetWeight) * 100), 100)

  const indicators = [
    { label: 'Peso', value: `${currentWeight} kg`, detail: `Meta: ${targetWeight} kg` },
    { label: 'Frequência semanal', value: '3x', detail: 'Meta atual atingida' },
    { label: 'Calorias gastas', value: `${totalCalories} kcal`, detail: 'Últimos treinos' },
    { label: 'Carga total', value: '2.840 kg', detail: 'Volume estimado' },
    { label: 'Tempo médio', value: '46 min', detail: 'Por treino' },
    { label: 'Recuperação média', value: '78%', detail: 'Boa' },
  ]

  return (
    <main className="app-shell">
      <section className="progress-screen" aria-labelledby="progress-title">
        <header className="progress-header">
          <p className="screen-kicker">Metas pessoais</p>
          <h1 id="progress-title">Progresso</h1>
        </header>

        <section className="progress-section" aria-labelledby="goals-title">
          <div className="section-heading">
            <h2 id="goals-title">Metas pessoais</h2>
            <span className="status-pill status-good">{weightProgress}%</span>
          </div>

          <article className="goal-card">
            <div>
              <span>Peso</span>
              <strong>{currentWeight} kg</strong>
              <p>Meta: {targetWeight} kg</p>
            </div>
            <div className="goal-track" aria-label={`Progresso de peso: ${weightProgress}%`}>
              <span style={{ width: `${weightProgress}%` }} />
            </div>
            <button className="edit-goal-button" type="button" onClick={() => setIsEditingGoals((value) => !value)}>
              {isEditingGoals ? 'Fechar edição' : 'Editar metas'}
            </button>
          </article>

          {isEditingGoals && (
            <form className="goal-edit-card">
              <label>
                <span>Peso atual (kg)</span>
                <input
                  type="number"
                  min="30"
                  max="250"
                  value={currentWeight}
                  onChange={(event) => setCurrentWeight(Number(event.target.value))}
                />
              </label>
              <label>
                <span>Meta de peso (kg)</span>
                <input
                  type="number"
                  min="30"
                  max="250"
                  value={targetWeight}
                  onChange={(event) => setTargetWeight(Number(event.target.value))}
                />
              </label>
            </form>
          )}

          <article className="weight-chart-card">
            <div>
              <span>Evolução de peso</span>
              <strong>+1,2 kg</strong>
            </div>
            <BarChart values={weightHistory} labels={weightLabels} goal={targetWeight} />
          </article>
        </section>

        <section className="progress-section" aria-labelledby="indicators-title">
          <div className="section-heading">
            <h2 id="indicators-title">Indicadores</h2>
          </div>

          <div className="indicator-grid">
            {indicators.map((indicator) => (
              <article className="indicator-card" key={indicator.label}>
                <span>{indicator.label}</span>
                <strong>{indicator.value}</strong>
                <p>{indicator.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="progress-section" aria-labelledby="history-title">
          <div className="section-heading">
            <h2 id="history-title">Histórico de treinos</h2>
            <span className="status-pill status-good">Recente</span>
          </div>

          <div className="workout-history-list">
            {recentHistory.slice(0, 4).map((workout, index) => (
              <article className="workout-history-card" key={`${workout.finishedAt}-${index}`}>
                <div>
                  <span>{formatWorkoutDate(workout.finishedAt)}</span>
                  <strong>{workout.performance}% de rendimento</strong>
                </div>
                <p>{workout.calories} kcal</p>
              </article>
            ))}
          </div>
        </section>

        <section className="progress-section" aria-labelledby="achievements-title">
          <article className="achievement-card">
            <span id="achievements-title">Conquista recente</span>
            <strong>Consistência em alta</strong>
            <p>Você manteve uma boa frequência de treinos na semana e está perto da meta de peso.</p>
          </article>
        </section>

        <BottomNavigation />
      </section>

      <DesktopOnly />
    </main>
  )
}

function getWorkoutHistory() {
  try {
    const storedHistory = localStorage.getItem('revo-workout-history')
    return storedHistory ? JSON.parse(storedHistory) : []
  } catch {
    return []
  }
}

function formatWorkoutDate(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(date))
}

export default ProgressPage
