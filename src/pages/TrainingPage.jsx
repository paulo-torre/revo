import { useEffect, useMemo, useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import DesktopOnly from '../components/DesktopOnly'
import './TrainingPage.css'

const exercises = [
  {
    name: 'Supino com halteres',
    load: 'halter de 20 kg',
    reps: '8 repetições',
  },
  {
    name: 'Remada baixa',
    load: '45 kg',
    reps: '10 repetições',
  },
]

function TrainingPage() {
  const [pulse, setPulse] = useState(0)
  const [setsRemaining, setSetsRemaining] = useState(3)
  const [restSeconds, setRestSeconds] = useState(0)
  const [calories, setCalories] = useState(130)
  const currentExercise = exercises[0]
  const workoutProgress = ((3 - setsRemaining) / 3) * 100

  const vitals = useMemo(() => {
    const heartRate = 121 + ((pulse * 7) % 28)
    const oxygen = heartRate > 142 ? 96 : heartRate > 134 ? 98 : 99
    const systolic = heartRate > 142 ? 14 : 13
    const diastolic = heartRate > 142 ? 9 : 8

    return {
      heartRate,
      oxygen,
      bloodPressure: `${systolic} / ${diastolic}`,
    }
  }, [pulse])

  const recommendation = getLiveRecommendation(vitals, restSeconds)

  useEffect(() => {
    const vitalsTimer = window.setInterval(() => {
      setPulse((currentPulse) => currentPulse + 1)
      setCalories((currentCalories) => currentCalories + 2)
    }, 2000)

    return () => window.clearInterval(vitalsTimer)
  }, [])

  useEffect(() => {
    if (restSeconds === 0) {
      return undefined
    }

    const restTimer = window.setInterval(() => {
      setRestSeconds((seconds) => Math.max(seconds - 1, 0))
    }, 1000)

    return () => window.clearInterval(restTimer)
  }, [restSeconds])

  function handleStartSet() {
    setSetsRemaining((currentSets) => Math.max(currentSets - 1, 0))
    setRestSeconds(75)
    setPulse((currentPulse) => currentPulse + 2)
  }

  function handleFinishWorkout() {
    const summary = {
      performance: 108,
      calories,
      heartRate: vitals.heartRate,
      oxygen: vitals.oxygen,
      bloodPressure: vitals.bloodPressure,
      finishedAt: new Date().toISOString(),
    }

    localStorage.setItem('revo-last-workout', JSON.stringify(summary))
    window.location.href = '/pos-training'
  }

  return (
    <main className="app-shell">
      <section className="training-screen" aria-labelledby="training-title">
        <header className="training-header">
          <div>
            <p className="screen-kicker">Conectado em: SmartWatch Exemplo</p>
            <h1 id="training-title">Treino</h1>
          </div>
          <button className="finish-button" type="button" onClick={handleFinishWorkout}>
            Finalizar Treino
          </button>
        </header>

        <section className="training-section exercise-panel" aria-labelledby="exercise-title">
          <div className="section-heading">
            <h2 id="exercise-title">Exercício</h2>
            <span className="status-pill status-good">Ao vivo</span>
          </div>

          <article className="exercise-card">
            <span>Atual</span>
            <strong>{currentExercise.name}</strong>
            <div className="exercise-details">
              <p>Peso: {currentExercise.load}</p>
              <p>{currentExercise.reps}</p>
              <p>{setsRemaining} séries restantes</p>
            </div>
          </article>

          <button
            className="primary-action start-set-button"
            type="button"
            onClick={handleStartSet}
            disabled={setsRemaining === 0}
          >
            {setsRemaining === 0 ? 'Séries concluídas' : 'Iniciar Série'}
          </button>

          <div className="rest-card">
            <span>Tempo de descanso restante</span>
            <strong>{formatTime(restSeconds)}</strong>
          </div>

          <div className="workout-progress-card">
            <div>
              <span>Progresso do treino</span>
              <strong>{Math.round(workoutProgress)}%</strong>
            </div>
            <div className="workout-progress-track" aria-hidden="true">
              <span style={{ width: `${workoutProgress}%` }} />
            </div>
          </div>
        </section>

        <section className="training-section" aria-labelledby="vitals-title">
          <div className="section-heading">
            <h2 id="vitals-title">Sinais vitais</h2>
            <span className={`status-pill ${recommendation.statusClass}`}>
              {recommendation.statusLabel}
            </span>
          </div>

          <div className="vitals-grid">
            <VitalCard
              label="Frequência cardíaca"
              value={`${vitals.heartRate} bpm`}
              status={getHeartRateStatus(vitals.heartRate)}
            />
            <VitalCard label="Gasto de calorias" value={`${calories} kcal`} status="good" />
            <VitalCard
              label="Pressão sanguínea"
              value={vitals.bloodPressure}
              status={vitals.heartRate > 142 ? 'warning' : 'good'}
            />
            <VitalCard
              label="Oxigenação do sangue"
              value={`${vitals.oxygen}%`}
              status={vitals.oxygen < 97 ? 'warning' : 'good'}
            />
          </div>
        </section>

        <section className="training-section" aria-labelledby="recommendation-title">
          <article className={`recommendation-card ${recommendation.status}`}>
            <span id="recommendation-title">Recomendação ao vivo</span>
            <strong>{recommendation.title}</strong>
            <p>{recommendation.message}</p>
          </article>

          <article className="next-exercise-card">
            <span>Próximo exercício</span>
            <strong>{exercises[1].name}</strong>
            <p>
              {exercises[1].reps} · {exercises[1].load}
            </p>
          </article>
        </section>

        <BottomNavigation />
      </section>

      <DesktopOnly />
    </main>
  )
}

function VitalCard({ label, value, status }) {
  return (
    <article className={`vital-card ${status}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function getHeartRateStatus(heartRate) {
  if (heartRate >= 144) {
    return 'danger'
  }

  if (heartRate >= 136) {
    return 'warning'
  }

  return 'good'
}

function getLiveRecommendation(vitals, restSeconds) {
  if (vitals.heartRate >= 144) {
    return {
      status: 'danger',
      statusClass: 'status-danger',
      statusLabel: 'Alerta',
      title: 'Reduza a intensidade',
      message: 'Sua frequência cardíaca está acima do ideal para este treino. Faça uma pausa maior antes da próxima série.',
    }
  }

  if (restSeconds > 0) {
    return {
      status: 'warning',
      statusClass: 'status-medium',
      statusLabel: 'Atenção',
      title: 'Priorize a recuperação',
      message: 'Mantenha o descanso até o timer zerar para preservar a qualidade das próximas séries.',
    }
  }

  if (vitals.oxygen < 97) {
    return {
      status: 'warning',
      statusClass: 'status-medium',
      statusLabel: 'Atenção',
      title: 'Respire com controle',
      message: 'Sua oxigenação caiu um pouco. Faça respirações profundas e retome em ritmo moderado.',
    }
  }

  if (vitals.heartRate > 132) {
    return {
      status: 'warning',
      statusClass: 'status-medium',
      statusLabel: 'Atenção',
      title: 'Hidrate-se antes da próxima série',
      message: 'A intensidade subiu. Tome água e mantenha a respiração controlada antes de continuar.',
    }
  }

  return {
    status: 'good',
    statusClass: 'status-good',
    statusLabel: 'Seguro',
    title: 'Mantenha o ritmo',
    message: 'Seus sinais estão estáveis. Continue no ritmo recomendado para o treino de hoje.',
  }
}

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const remainingSeconds = String(seconds % 60).padStart(2, '0')

  return `${minutes}:${remainingSeconds}`
}

export default TrainingPage
