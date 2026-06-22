import './MacroRing.css'

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

export default MacroRing
