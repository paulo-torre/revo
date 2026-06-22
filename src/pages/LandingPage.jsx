import DesktopOnly from '../components/DesktopOnly'
import './LandingPage.css'

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

export default LandingPage
