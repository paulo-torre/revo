import { useEffect, useMemo } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import DesktopOnly from '../components/DesktopOnly'
import './PostTrainingPage.css'

const fallbackWorkout = {
  performance: 108,
  calories: 130,
  heartRate: 121,
  oxygen: 99,
  bloodPressure: '13 / 8',
  finishedAt: new Date().toISOString(),
}

function PostTrainingPage() {
  const workout = useMemo(() => getLastWorkout(), [])
  const performanceStatus = getPerformanceStatus(workout.performance)
  const vitalSummary = [
    {
      label: 'Frequência cardíaca',
      value: `${workout.heartRate} bpm`,
      status: workout.heartRate >= 144 ? 'danger' : workout.heartRate >= 136 ? 'warning' : 'good',
    },
    {
      label: 'Gasto de calorias',
      value: `${workout.calories} kcal`,
      status: 'good',
    },
    {
      label: 'Pressão sanguínea',
      value: workout.bloodPressure,
      status: workout.heartRate >= 144 ? 'warning' : 'good',
    },
    {
      label: 'Oxigenação do sangue',
      value: `${workout.oxygen}%`,
      status: workout.oxygen < 97 ? 'warning' : 'good',
    },
  ]

  useEffect(() => {
    const history = getWorkoutHistory()
    const alreadySaved = history.some((item) => item.finishedAt === workout.finishedAt)

    if (!alreadySaved) {
      localStorage.setItem('revo-workout-history', JSON.stringify([workout, ...history].slice(0, 10)))
    }
  }, [workout])

  return (
    <main className="app-shell">
      <section className="post-training-screen" aria-labelledby="post-training-title">
        <header className="post-training-header">
          <p className="screen-kicker">Treino finalizado</p>
          <h1 id="post-training-title">Treino</h1>
        </header>

        <section className="post-training-section" aria-labelledby="performance-title">
          <article className={`performance-card ${performanceStatus.status}`}>
            <span id="performance-title">Rendimento</span>
            <strong>{workout.performance}%</strong>
            <p>{performanceStatus.message}</p>
          </article>

          <article className="recovery-card">
            <span>Recomendação pós-treino</span>
            <strong>{performanceStatus.recoveryTitle}</strong>
            <p>{performanceStatus.recoveryMessage}</p>
          </article>
        </section>

        <section className="post-training-section" aria-labelledby="post-vitals-title">
          <div className="section-heading">
            <h2 id="post-vitals-title">Sinais vitais</h2>
            <span className={`status-pill ${performanceStatus.statusClass}`}>
              {performanceStatus.statusLabel}
            </span>
          </div>

          <div className="post-vitals-grid">
            {vitalSummary.map((vital) => (
              <article className={`post-vital-card ${vital.status}`} key={vital.label}>
                <span>{vital.label}</span>
                <strong>{vital.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <div className="post-actions">
          <a className="primary-action" href="/inicio">
            Voltar para Home
          </a>
          <a className="secondary-action" href="/progress">
            Ver progresso
          </a>
        </div>

        <BottomNavigation />
      </section>

      <DesktopOnly />
    </main>
  )
}

function getLastWorkout() {
  try {
    const storedWorkout = localStorage.getItem('revo-last-workout')
    return storedWorkout ? JSON.parse(storedWorkout) : fallbackWorkout
  } catch {
    return fallbackWorkout
  }
}

function getWorkoutHistory() {
  try {
    const storedHistory = localStorage.getItem('revo-workout-history')
    return storedHistory ? JSON.parse(storedHistory) : []
  } catch {
    return []
  }
}

function getPerformanceStatus(performance) {
  if (performance > 105) {
    return {
      status: 'warning',
      statusClass: 'status-medium',
      statusLabel: 'Atenção',
      message: 'Você treinou com mais intensidade que o recomendado.',
      recoveryTitle: 'Descanse bem antes do próximo treino',
      recoveryMessage: 'Priorize hidratação, alimentação leve e uma noite de sono consistente para recuperar melhor.',
    }
  }

  if (performance < 80) {
    return {
      status: 'danger',
      statusClass: 'status-danger',
      statusLabel: 'Baixo',
      message: 'Seu treino ficou abaixo da intensidade recomendada.',
      recoveryTitle: 'Recupere e ajuste o próximo treino',
      recoveryMessage: 'O próximo treino pode começar mais leve e subir a intensidade aos poucos.',
    }
  }

  return {
    status: 'good',
    statusClass: 'status-good',
    statusLabel: 'Bom',
    message: 'Você treinou dentro da intensidade recomendada.',
    recoveryTitle: 'Recuperação em bom ritmo',
    recoveryMessage: 'Mantenha hidratação e descanso regular para preservar sua evolução.',
  }
}

export default PostTrainingPage
