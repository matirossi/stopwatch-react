import { useEffect, useRef, useState } from 'react'
import './App.css'
import Buttons from './components/Buttons./Buttons'
import MainTimer from './components/MainTimer/MainTimer'
import LapContainer from './components/LapContainer/LapContainer'


function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState()
  const [timeList, setTimesList] = useState()
  

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

  const toggleIsTimeRunning = () => {
    setIsTimeRunning(!isTimeRunning)
  }

  const addElapsedTime = () => {
    setTimesList = [...timesList, elapsedTime]
  }
  return (
    <main className="App">
      <section className="stopwatch-container">
      <div className="main-timer-container">
        <MainTimer elapsedTime={elapsedTime} />
        <Buttons toggleIsTimeRunning={toggleIsTimeRunning} isTimeRunning={isTimeRunning} elapsedTime={elapsedTime}/>
      </div>
      <section className="lap-container">
        <LapContainer elapsedTime={elapsedTime}/>
      </section>
      </section>
    </main>
  )
}

export default App
