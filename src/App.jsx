import { useState } from 'react'
import './App.css'

const initialSignupData = {
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  goal: '',
  level: '',
  weight: '',
  height: '',
  frequency: '',
}

const goalOptions = ['Perder peso', 'Hipertrofia', 'Ganhar força', 'Aumentar resistência']
const levelOptions = ['Iniciante', 'Intermediário', 'Avançado', 'Atleta profissional']
const frequencyOptions = [
  '1-2x por semana',
  '3x por semana',
  '4x por semana',
  '5x por semana',
  'Mais de 5x por semana',
]

function getStoredProfile() {
  try {
    const storedProfile = localStorage.getItem('revo-user-profile')
    return storedProfile ? JSON.parse(storedProfile) : initialSignupData
  } catch {
    return initialSignupData
  }
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Informe seu e-mail.'
    } else if (!email.includes('@')) {
      nextErrors.email = 'Digite um e-mail válido.'
    }

    if (!password) {
      nextErrors.password = 'Informe sua senha.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      window.location.href = '/inicio'
    }
  }

  return (
    <main className="app-shell">
      <section className="auth-screen" aria-labelledby="login-title">
        <a className="back-link" href="/">
          REVO
        </a>

        <div className="auth-heading">
          <p className="screen-kicker">Bem-vindo de volta</p>
          <h1 id="login-title">Entrar na conta</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field-group" htmlFor="email">
            <span>E-mail:</span>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <small className="field-error" id="email-error">
                {errors.email}
              </small>
            )}
          </label>

          <label className="field-group" htmlFor="password">
            <span>Senha:</span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && (
              <small className="field-error" id="password-error">
                {errors.password}
              </small>
            )}
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
            />
            <span>Mostrar senha</span>
          </label>

          <button className="primary-action auth-submit" type="submit">
            Entrar
          </button>
        </form>

        <p className="auth-switch">
          Ainda não tem conta? <a href="/signup">Criar conta</a>
        </p>
      </section>
    </main>
  )
}

function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [signupData, setSignupData] = useState(initialSignupData)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const isComplete = currentStep === 6
  const progress = Math.min(currentStep + 1, 6)

  function updateField(field, value) {
    setSignupData((currentData) => ({
      ...currentData,
      [field]: value,
    }))
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }))
  }

  function validateStep() {
    const nextErrors = {}

    if (currentStep === 0) {
      if (!signupData.email.trim()) {
        nextErrors.email = 'Informe seu e-mail.'
      } else if (!signupData.email.includes('@')) {
        nextErrors.email = 'Digite um e-mail válido.'
      }

      if (!signupData.password) {
        nextErrors.password = 'Informe uma senha.'
      } else if (signupData.password.length < 6) {
        nextErrors.password = 'Use pelo menos 6 caracteres.'
      }

      if (!signupData.confirmPassword) {
        nextErrors.confirmPassword = 'Confirme sua senha.'
      } else if (signupData.confirmPassword !== signupData.password) {
        nextErrors.confirmPassword = 'As senhas precisam ser iguais.'
      }
    }

    if (currentStep === 1 && !signupData.username.trim()) {
      nextErrors.username = 'Informe como devo te chamar.'
    }

    if (currentStep === 2 && !signupData.goal) {
      nextErrors.goal = 'Escolha um objetivo.'
    }

    if (currentStep === 3 && !signupData.level) {
      nextErrors.level = 'Escolha seu nível atual.'
    }

    if (currentStep === 4) {
      const weight = Number(signupData.weight)
      const height = Number(signupData.height)

      if (!weight || weight < 30 || weight > 250) {
        nextErrors.weight = 'Informe uma massa entre 30 kg e 250 kg.'
      }

      if (!height || height < 120 || height > 230) {
        nextErrors.height = 'Informe uma altura entre 120 cm e 230 cm.'
      }
    }

    if (currentStep === 5 && !signupData.frequency) {
      nextErrors.frequency = 'Escolha sua frequência de treino.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleNext(event) {
    event.preventDefault()

    if (!validateStep()) {
      return
    }

    if (currentStep === 5) {
      localStorage.setItem('revo-user-profile', JSON.stringify(signupData))
      setCurrentStep(6)
      return
    }

    setCurrentStep((step) => step + 1)
  }

  function handleBack() {
    setErrors({})
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  function handleContinue() {
    window.location.href = '/inicio'
  }

  return (
    <main className="app-shell">
      <section className="auth-screen signup-screen" aria-labelledby="signup-title">
        <a className="back-link" href="/">
          REVO
        </a>

        {isComplete ? (
          <div className="completion-panel">
            <p className="screen-kicker">Perfil inicial pronto</p>
            <h1 id="signup-title">Conta configurada</h1>
            <p>
              {signupData.username || 'Você'}, com base no seu perfil, você está
              pronto para começar um treino focado em{' '}
              {signupData.goal ? signupData.goal.toLowerCase() : 'saúde'}.
            </p>

            <dl className="profile-summary">
              <div>
                <dt>Objetivo</dt>
                <dd>{signupData.goal}</dd>
              </div>
              <div>
                <dt>Nível</dt>
                <dd>{signupData.level}</dd>
              </div>
              <div>
                <dt>Frequência</dt>
                <dd>{signupData.frequency}</dd>
              </div>
            </dl>

            <button className="primary-action auth-submit" type="button" onClick={handleContinue}>
              Continuar
            </button>
          </div>
        ) : (
          <>
            <div className="auth-heading signup-heading">
              <p className="screen-kicker">Passo {progress} de 6</p>
              <h1 id="signup-title">{getSignupTitle(currentStep, signupData.username)}</h1>
            </div>

            <div className="progress-track" aria-hidden="true">
              <span style={{ width: `${(progress / 6) * 100}%` }} />
            </div>

            <form className="auth-form signup-form" onSubmit={handleNext} noValidate>
              {renderSignupStep({
                currentStep,
                signupData,
                showPassword,
                setShowPassword,
                errors,
                updateField,
              })}

              <div className="step-actions">
                <button
                  className="secondary-action step-back"
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Voltar
                </button>
                <button className="primary-action step-next" type="submit">
                  {currentStep === 5 ? 'Enviar' : 'Avançar'}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </main>
  )
}

function getSignupTitle(step, username) {
  const name = username.trim() || 'Paulo'

  const titles = [
    'Criar conta',
    'Primeiro, como devo te chamar?',
    `Olá, ${name}! Qual o seu objetivo atual?`,
    'Qual o seu nível atual de treino?',
    'Vamos ajustar seu perfil físico',
    'Qual a frequência de treino?',
  ]

  return titles[step]
}

function renderSignupStep({
  currentStep,
  signupData,
  showPassword,
  setShowPassword,
  errors,
  updateField,
}) {
  if (currentStep === 0) {
    return (
      <>
        <label className="field-group" htmlFor="signup-email">
          <span>E-mail:</span>
          <input
            id="signup-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={signupData.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>

        <label className="field-group" htmlFor="signup-password">
          <span>Senha:</span>
          <input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={signupData.password}
            onChange={(event) => updateField('password', event.target.value)}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && <small className="field-error">{errors.password}</small>}
        </label>

        <label className="field-group" htmlFor="signup-confirm-password">
          <span>Confirmar senha:</span>
          <input
            id="signup-confirm-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={signupData.confirmPassword}
            onChange={(event) => updateField('confirmPassword', event.target.value)}
            aria-invalid={Boolean(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <small className="field-error">{errors.confirmPassword}</small>
          )}
        </label>

        <label className="check-row">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(event) => setShowPassword(event.target.checked)}
          />
          <span>Mostrar senha</span>
        </label>
      </>
    )
  }

  if (currentStep === 1) {
    return (
      <label className="field-group" htmlFor="signup-username">
        <span>Nome de usuário:</span>
        <input
          id="signup-username"
          type="text"
          autoComplete="given-name"
          value={signupData.username}
          onChange={(event) => updateField('username', event.target.value)}
          aria-invalid={Boolean(errors.username)}
        />
        {errors.username && <small className="field-error">{errors.username}</small>}
      </label>
    )
  }

  if (currentStep === 2) {
    return (
      <OptionGroup
        name="goal"
        options={goalOptions}
        value={signupData.goal}
        error={errors.goal}
        onChange={(value) => updateField('goal', value)}
      />
    )
  }

  if (currentStep === 3) {
    return (
      <OptionGroup
        name="level"
        options={levelOptions}
        value={signupData.level}
        error={errors.level}
        onChange={(value) => updateField('level', value)}
      />
    )
  }

  if (currentStep === 4) {
    return (
      <>
        <label className="field-group" htmlFor="signup-weight">
          <span>Massa (kg):</span>
          <input
            id="signup-weight"
            type="number"
            inputMode="decimal"
            min="30"
            max="250"
            value={signupData.weight}
            onChange={(event) => updateField('weight', event.target.value)}
            aria-invalid={Boolean(errors.weight)}
          />
          {errors.weight && <small className="field-error">{errors.weight}</small>}
        </label>

        <label className="field-group" htmlFor="signup-height">
          <span>Altura (cm):</span>
          <input
            id="signup-height"
            type="number"
            inputMode="numeric"
            min="120"
            max="230"
            value={signupData.height}
            onChange={(event) => updateField('height', event.target.value)}
            aria-invalid={Boolean(errors.height)}
          />
          {errors.height && <small className="field-error">{errors.height}</small>}
        </label>
      </>
    )
  }

  return (
    <OptionGroup
      name="frequency"
      options={frequencyOptions}
      value={signupData.frequency}
      error={errors.frequency}
      onChange={(value) => updateField('frequency', value)}
    />
  )
}

function OptionGroup({ name, options, value, error, onChange }) {
  return (
    <div className="option-group">
      {options.map((option) => (
        <label className="option-card" key={option}>
          <input
            type="radio"
            name={name}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span>{option}</span>
        </label>
      ))}
      {error && <small className="field-error">{error}</small>}
    </div>
  )
}

function HomePage() {
  const profile = getStoredProfile()
  const username = profile.username || 'Paulo'
  const goal = profile.goal || 'Ganhar força'
  const activityHistory = [4200, 5100, 6900, 6200, 7312, 5400, 7800]
  const sleepHistory = [74, 82, 78, 88, 92, 84, 90]
  const macros = [
    { label: 'Calorias', value: '1740', unit: 'kcal', percent: 72, color: '#8df0a7' },
    { label: 'Carboidratos', value: '113g', unit: '', percent: 58, color: '#f5a742' },
    { label: 'Gorduras', value: '30g', unit: '', percent: 44, color: '#51beed' },
    { label: 'Proteínas', value: '72g', unit: '', percent: 81, color: '#e65064' },
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

          <article className="chart-card">
            <div>
              <span>Passos</span>
              <strong>7.312</strong>
            </div>
            <BarChart values={activityHistory} />
          </article>

          <div className="macro-grid">
            {macros.map((macro) => (
              <MacroRing key={macro.label} {...macro} />
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="history-title">
          <div className="section-heading">
            <h2 id="history-title">Histórico</h2>
            <span className="status-pill status-good">Ótima</span>
          </div>

          <article className="chart-card sleep-card">
            <div>
              <span>Qualidade do sono</span>
              <strong>Ótima</strong>
            </div>
            <LineChart values={sleepHistory} />
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
    Hipertrofia: 'Treino moderado de superiores',
    'Ganhar força': 'Treino leve de membros superiores',
    'Aumentar resistência': 'Treino aeróbico progressivo',
  }

  return suggestions[goal] || 'Treino leve de membros superiores'
}

function BarChart({ values }) {
  const maxValue = Math.max(...values)

  return (
    <div className="bar-chart" aria-label="Histórico de passos da semana">
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          style={{ height: `${Math.max((value / maxValue) * 100, 18)}%` }}
        />
      ))}
    </div>
  )
}

function LineChart({ values }) {
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 100 - value
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg className="line-chart" viewBox="0 0 100 100" role="img" aria-label="Histórico de sono da semana">
      <polyline points={points} fill="none" pathLength="1" />
    </svg>
  )
}

function MacroRing({ label, value, unit, percent, color }) {
  return (
    <article className="macro-card">
      <div className="macro-ring" style={{ '--percent': `${percent}%`, '--color': color }}>
        <span>{value}</span>
        {unit && <small>{unit}</small>}
      </div>
      <strong>{label}</strong>
    </article>
  )
}

function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <a className="active" href="/inicio">
        <span aria-hidden="true">⌂</span>
        Home
      </a>
      <a href="/progress">
        <span aria-hidden="true">↗</span>
        Progresso
      </a>
      <a href="/nutrition">
        <span aria-hidden="true">◔</span>
        Nutrição
      </a>
      <a href="/account">
        <span aria-hidden="true">◎</span>
        Perfil
      </a>
    </nav>
  )
}

function DesktopOnly() {
  return (
    <section className="desktop-only" aria-labelledby="desktop-title">
      <h2 id="desktop-title">
        Conteúdo disponível
        <span>apenas em resolução mobile</span>
      </h2>
    </section>
  )
}

function LandingPage() {
  return (
    <main className="app-shell">
      <section className="mobile-entry" aria-labelledby="brand-title">
        <div className="brand-block">
          <p className="brand-kicker">saúde e treino ao vivo</p>
          <h1 id="brand-title">REVO</h1>
        </div>

        <div className="entry-actions" aria-label="Ações iniciais">
          <a className="primary-action" href="/signup">
            Criar Conta
          </a>
          <a className="secondary-action" href="/login">
            Já possuo uma conta
          </a>
        </div>
      </section>

      <DesktopOnly />
    </main>
  )
}

function App() {
  const path = window.location.pathname

  if (path === '/login') {
    return <LoginPage />
  }

  if (path === '/signup') {
    return <SignupPage />
  }

  if (path === '/inicio') {
    return <HomePage />
  }

  return <LandingPage />
}

export default App
