import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import './LoginPage.css'

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
    <AuthLayout labelledBy="login-title">
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
    </AuthLayout>
  )
}

export default LoginPage
