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
  const requestRef = useRef()

  const runTimer = (timestamp) => {
    if (startingTime === 0) setStartingTime(timestamp) 
  
    setElapsedTime( timestamp - startingTime + timeAtPause)
    requestRef.current = requestAnimationFrame(runTimer)
  }
  useEffect(()=>{
    setFormattedTime(updateTimer(elapsedTime))},[elapsedTime])

  useEffect(() => {
    if (isTimeRunning) {
      requestRef.current = requestAnimationFrame(runTimer)
      return ()=> {cancelAnimationFrame(requestRef.current)}
    }}, [isTimeRunning]);
    
    useEffect(()=> {
      if(!isTimeRunning){
        cancelAnimationFrame(requestRef.current)
        setStartingTime(0)
        setTimeAtPause(elapsedTime)
        return () => cancelAnimationFrame(requestRef.current)}
      }, [isTimeRunning])
      
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
