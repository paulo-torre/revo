import './OptionGroup.css'

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

export default OptionGroup
