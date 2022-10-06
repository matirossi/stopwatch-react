import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import updateTimer from './utils'
import './App.css'


function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState()

  const runTimer = (timestamp) => {
    setElapsedTime(prev => {
      return prev + 60})
  }

  useEffect(() => {
    let intervalId
    if (isTimeRunning) {
      intervalId = setInterval(runTimer, 60)
    }
    if (!isTimeRunning) {
      clearInterval(intervalId)
    }
    return () => { clearInterval(intervalId) } //if the component is uunmounted while the time is runnning?
  }, [isTimeRunning]);

  const handleClick = () => {
    setIsTimeRunning(!isTimeRunning)
  }
  return (
    <div className="App">
      <div className="main-timer-container">
        <span className="main-timer">{updateTimer(elapsedTime)}</span>
        <div className="buttons-container">
          {!isTimeRunning && <button className="start-button" onClick={handleClick}>start</button>}
          {isTimeRunning && <button className="stop-button" onClick={handleClick}>stop</button>}
        </div>
      </div>
    </div>
  )
}

export default App
