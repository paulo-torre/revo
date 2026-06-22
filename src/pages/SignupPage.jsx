import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import OptionGroup from '../components/OptionGroup'
import { initialSignupData } from '../data/signupData'
import './SignupPage.css'

const goalOptions = ['Perder peso', 'Hipertrofia', 'Ganhar força', 'Aumentar resistência']
const levelOptions = ['Iniciante', 'Intermediário', 'Avançado', 'Atleta profissional']
const frequencyOptions = [
  '1-2x por semana',
  '3x por semana',
  '4x por semana',
  '5x por semana',
  'Mais de 5x por semana',
]

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
    <AuthLayout className="signup-screen" labelledBy="signup-title">
      {isComplete ? (
        <div className="completion-panel">
          <p className="screen-kicker">Perfil inicial pronto</p>
          <h1 id="signup-title">Conta configurada</h1>
          <p>
            {signupData.username || 'Você'}, com base no seu perfil, você está pronto
            para começar um treino focado em{' '}
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
            <SignupStep
              currentStep={currentStep}
              signupData={signupData}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              errors={errors}
              updateField={updateField}
            />

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
    </AuthLayout>
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

function SignupStep({
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

export default SignupPage
