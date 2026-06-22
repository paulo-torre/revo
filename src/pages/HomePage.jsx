import BottomNavigation from '../components/BottomNavigation'
import { BarChart } from '../components/Charts'
import DesktopOnly from '../components/DesktopOnly'
import MacroRing from '../components/MacroRing'
import { initialSignupData } from '../data/signupData'
import './HomePage.css'

function getStoredProfile() {
  try {
    const storedProfile = localStorage.getItem('revo-user-profile')
    return storedProfile ? JSON.parse(storedProfile) : initialSignupData
  } catch {
    return initialSignupData
  }
}

function HomePage() {
  const profile = getStoredProfile()
  const username = profile.username || 'Paulo'
  const goal = profile.goal || 'Ganhar força'
  const activityHistory = [7005, 5600, 6900, 6200, 7312, 5400, 7800]
  const activityLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  const sleepHistory = [8.5, 7, 8, 8.2, 8.5, 8, 8.1]
  const macros = [
    { label: 'Calorias', value: '1740', unit: 'kcal', percent: 72, color: '#8df0a7' },
    { label: 'Carboidratos', value: '113g', unit: '', percent: 58, color: '#f5a742' },
    { label: 'Gorduras', value: '30g', unit: '', percent: 44, color: '#51beed' },
    { label: 'Proteínas', value: '72g', unit: '', percent: 81, color: '#a33c4a' },
  ]

  return (
    <main className="app-shell">
      <section className="home-screen" aria-labelledby="home-title">
        <header className="home-header">
          <div>
            <p className="screen-kicker">Olá, {username}</p>
            <h1 id="home-title">Home</h1>
          </div>
          <span className="profile-dot" aria-hidden="true">
            {username.charAt(0).toUpperCase()}
          </span>
        </header>

        <section className="home-section" aria-labelledby="day-title">
          <div className="section-heading">
            <h2 id="day-title">Detalhes do dia</h2>
            <span className="status-pill status-medium">Médio</span>
          </div>

          <div className="highlight-card">
            <div>
              <span>Nível de atividade física</span>
              <strong>Médio</strong>
            </div>
            <a className="primary-action start-training" href="/training">
              Iniciar treino
            </a>
          </div>

          <div className="metric-grid">
            <article className="metric-card">
              <span>Nível de recuperação</span>
              <strong className="status-good-text">78%</strong>
            </article>
            <article className="metric-card">
              <span>Treino do dia</span>
              <strong>{getWorkoutSuggestion(goal)}</strong>
            </article>
          </div>

          <div className="macro-grid">
            {macros.map((macro) => (
              <MacroRing key={macro.label} {...macro} />
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="history-title">
          <div className="section-heading">
            <h2 id="history-title">Histórico</h2>
            <span className="status-pill status-good">Bom</span>
          </div>

          <article className="chart-card">
            <div>
              <span>Passos</span>
              <strong>7.312</strong>
            </div>
            <BarChart values={activityHistory} labels={activityLabels} goal={6000} />
          </article>

          <article className="chart-card sleep-card">
            <div>
              <span>Qualidade do sono</span>
              <strong>Ótima</strong>
            </div>
            <BarChart values={sleepHistory} labels={activityLabels} goal={8} />
          </article>
        </section>

        <BottomNavigation />
      </section>

      <DesktopOnly />
    </main>
  )
}

function getWorkoutSuggestion(goal) {
  const suggestions = {
    'Perder peso': 'Treino intervalado leve',
    'Hipertrofia': 'Treino moderado de superiores',
    'Ganhar força': 'Treino leve de membros superiores',
    'Aumentar resistência': 'Treino aeróbico progressivo',
  }

  return suggestions[goal] || 'Treino leve de membros superiores'
}

export default HomePage
