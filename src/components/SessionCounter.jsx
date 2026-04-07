export default function SessionCounter({ sessions }) {
  return (
    <div className="session-counter">
      <p className="session-label">Sessions completed</p>
      <div className="session-dots">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`session-dot ${i < sessions % 4 ? 'filled' : ''}`}
          />
        ))}
      </div>
      <p className="session-total">
        {sessions} total · {Math.floor(sessions / 4)} sets of 4
      </p>
    </div>
  )
}