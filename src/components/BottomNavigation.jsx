import './BottomNavigation.css'

function BottomNavigation() {
  const path = window.location.pathname

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <a className={path === '/inicio' ? 'active' : undefined} href="/inicio">
        <span aria-hidden="true">⌂</span>
        Home
      </a>
      <a className={path === '/progress' ? 'active' : undefined} href="/progress">
        <span aria-hidden="true">↗</span>
        Progresso
      </a>
      <a className={path === '/nutrition' ? 'active' : undefined} href="/nutrition">
        <span aria-hidden="true">◔</span>
        Nutrição
      </a>
      <a className={path === '/account' ? 'active' : undefined} href="/account">
        <span aria-hidden="true">◎</span>
        Perfil
      </a>
    </nav>
  )
}

export default BottomNavigation
