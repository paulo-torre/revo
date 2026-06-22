import './DesktopOnly.css'

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

export default DesktopOnly
