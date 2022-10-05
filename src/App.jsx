import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { updateTimer } from './utils'
import './App.css'


function App() {
  const formatNumber = (number) => {
    return number.toString().padStart(2, "0")
  }
  const updateTimer = (elapsedTime) => {
    const centiseconds = Math.floor(elapsedTime / 10) % 100
    const seconds = Math.floor(elapsedTime / 1000) % 60
    const minutes = Math.floor(elapsedTime / 1000 / 60) % 60
    
    return `${formatNumber(minutes)}:${formatNumber(seconds)}.${formatNumber(centiseconds)}`
  }
  
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [startingTime, setStartingTime] = useState(0)
  const [timeAtPause, setTimeAtPause] = useState(0)
  const [formattedTime, setFormattedTime] = useState(updateTimer(0))
  let animationFrameId

  const handleClick = ()=>{
    setIsTimeRunning(true)
  }
  const doStart = ()=>{
    setIsTimeRunning(false)
  }
  return (
    <div className="App">
      <div className="main-timer-container">
        <span className="main-timer">{formattedTime}</span>
        <div className="buttons-container">
          {!isTimeRunning && <button className="start-button" onClick={handleClick}>start</button>}
          {isTimeRunning && <button className="stop-button" onClick={doStart}>stop</button>}
        </div>
      </div>
    </div>
  )
}

export default App
