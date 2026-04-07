export default function TimerDisplay({ timeLeft, mode, isRunning }) {
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // calculate progress for the circle
  const FULL_DASH = 283; // circumference of circle (2 * PI * 45)

  return (
    <div className={`timer-display ${mode}`}>
      <div className="timer-circle-wrapper">
        <svg viewBox="0 0 100 100" className="timer-svg">
          {/* background circle */}
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          {/* progress circle */}
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="4"
            strokeDasharray={FULL_DASH}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="timer-time">
          {formatTime(timeLeft)}
        </div>
      </div>
      <p className="timer-status">
        {isRunning ? '● Running' : '○ Paused'}
      </p>
    </div>
  )
}