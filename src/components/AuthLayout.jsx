import './AuthLayout.css'

function AuthLayout({ children, className = '', labelledBy }) {
  return (
    <main className="app-shell">
      <section className={`auth-screen ${className}`.trim()} aria-labelledby={labelledBy}>
        <a className="back-link" href="/">
          REVO
        </a>
        {children}
      </section>
    </main>
  )
}

export default AuthLayout
