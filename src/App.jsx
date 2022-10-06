import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import updateTimer from './utils'
import './App.css'


function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState()
  const [startingTime, setStartingTime] = useState(0)
  //const [timeAtPause, setTimeAtPause] = useState(0)
  const [animationFrameId, setAnimationFrameId] = useState(0)

  const runTimer = (timestamp) => {
   // if (startingTime === 0) setStartingTime(timestamp)//not inmediatly available!
    //console.log(startingTime) //why is always 0 and not the previous value? 

    setElapsedTime(prev => {
      console.log("previous elapsed time",prev)
      console.log("timestamp", timestamp)
      console.log("startingTime", startingTime);
      return timestamp - startingTime})
    setAnimationFrameId(requestAnimationFrame(runTimer))
  }

  useEffect(() => {
    if (isTimeRunning) {
      setAnimationFrameId(requestAnimationFrame(runTimer))
    }
    if (!isTimeRunning) {
      cancelAnimationFrame(animationFrameId)
      setStartingTime(0)
  //    setTimeAtPause(elapsedTime)
    }
    return () => { cancelAnimationFrame(animationFrameId) } //if the component is uunmounted while the time is runnning
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
