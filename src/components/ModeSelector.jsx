const MODES = [
  { id: 'work',       label: 'Work',        duration: 25 },
  { id: 'shortBreak', label: 'Short Break', duration: 5  },
  { id: 'longBreak',  label: 'Long Break',  duration: 15 }
];

export { MODES };

export default function ModeSelector({ mode, onModeChange }) {
  return (
    <div className="mode-selector">
      {MODES.map(m => (
        <button
          key={m.id}
          className={`mode-btn ${mode === m.id ? 'active' : ''}`}
          onClick={() => onModeChange(m.id, m.duration)}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}