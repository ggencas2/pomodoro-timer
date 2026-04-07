import { useState, useEffect } from 'react';
import ModeSelector, { MODES } from './components/ModeSelector.jsx';
import TimerDisplay from './components/TimerDisplay.jsx';
import TimerControls from './components/TimerControls.jsx';
import SessionCounter from './components/SessionCounter.jsx';
import './index.css';

export default function App() {
  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(MODES[0].duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  // THE TIMER — useEffect with cleanup
  useEffect(() => {
    if (!isRunning) return; // do nothing if paused

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // timer finished
          clearInterval(interval);
          setIsRunning(false);

          // if work session finished — increment counter
          if (mode === 'work') {
            setSessions(s => s + 1);
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // cleanup — clear interval when component re-renders or unmounts
    return () => clearInterval(interval);
  }, [isRunning, mode]); // re-run when isRunning or mode changes

  // UPDATE BROWSER TAB TITLE
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const time = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    const modeLabel = MODES.find(m => m.id === mode)?.label || 'Work';
    document.title = `${time} — ${modeLabel} | Pomodoro`;

    return () => { document.title = 'Pomodoro Timer'; };
  }, [timeLeft, mode]);

  function handleModeChange(newMode, duration) {
    setMode(newMode);
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }

  function handleStart() { setIsRunning(true); }
  function handlePause() { setIsRunning(false); }

  function handleReset() {
    setIsRunning(false);
    const currentMode = MODES.find(m => m.id === mode);
    setTimeLeft(currentMode.duration * 60);
  }

  return (
    <div className={`app ${mode}`}>
      <div className="card">
        <h1>Pomodoro Timer</h1>

        <ModeSelector
          mode={mode}
          onModeChange={handleModeChange}
        />

        <TimerDisplay
          timeLeft={timeLeft}
          mode={mode}
          isRunning={isRunning}
        />

        <TimerControls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />

        <SessionCounter sessions={sessions} />
      </div>
    </div>
  )
}