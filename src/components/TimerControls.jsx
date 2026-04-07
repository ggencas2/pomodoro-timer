export default function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset
}) {
  return (
    <div className="timer-controls">
      {isRunning ? (
        <button className="ctrl-btn pause" onClick={onPause}>
          ⏸ Pause
        </button>
      ) : (
        <button className="ctrl-btn start" onClick={onStart}>
          ▶ Start
        </button>
      )}
      <button className="ctrl-btn reset" onClick={onReset}>
        ↺ Reset
      </button>
    </div>
  )
}