import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import updateTimer from './utils'
import './App.css'


function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState()
  const [startingTime, setStartingTime] = useState(0)
  const [timeAtPause, setTimeAtPause] = useState(0)
  const [formattedTime, setFormattedTime] = useState(updateTimer(0))
  const [animationFrameId, setAnimationFrameId] = useState(0)

  const runTimer = (timestamp) => {
    if (startingTime === 0) setStartingTime(timestamp)

    setElapsedTime(timestamp - startingTime)
    setAnimationFrameId(requestAnimationFrame(runTimer))
  }

  useEffect(() => {
    setFormattedTime(updateTimer(elapsedTime))
  }, [elapsedTime])

  useEffect(() => {
    if (isTimeRunning) {
      setAnimationFrameId(requestAnimationFrame(runTimer))
    }
    return () => { cancelAnimationFrame(animationFrameId) } //if the component is uunmounted while the time is runnning
  }, [isTimeRunning]);

  useEffect(() => {
    if (!isTimeRunning) {
      cancelAnimationFrame(animationFrameId)
      setStartingTime(0)
      setTimeAtPause(elapsedTime)
    }
  }, [isTimeRunning])

  const handleClick = () => {
    setIsTimeRunning(!isTimeRunning)
  }
  return (
    <div className="App">
      <div className="main-timer-container">
        <span className="main-timer">{formattedTime}</span>
        <div className="buttons-container">
          {!isTimeRunning && <button className="start-button" onClick={handleClick}>start</button>}
          {isTimeRunning && <button className="stop-button" onClick={handleClick}>stop</button>}
        </div>
      </div>
    </div>
  )
}

export default App
