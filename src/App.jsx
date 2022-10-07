import { useEffect, useRef, useState } from 'react'
import './App.css'
import Buttons from './components/Buttons/Buttons'
import MainTimer from './components/MainTimer/MainTimer'
import LapContainer from './components/LapContainer/LapContainer'


function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [updateTimesList, setUpdateTimesList] = useState(0)


  const runTimer = () => {
    setElapsedTime(prev => {
      return prev + 60
    })
  }

  useEffect(() => {
    let intervalId
    if (isTimeRunning) {
      intervalId = setInterval(runTimer, 50)
    }
    if (!isTimeRunning) {
      clearInterval(intervalId)
    }
    return () => { clearInterval(intervalId) } //if the component is unmounted while the time is runnning?
  }, [isTimeRunning]);

  const toggleIsTimeRunning = () => {
    setIsTimeRunning(!isTimeRunning)
  }

  const addElapsedTime = () => {
    setUpdateTimesList(prev => prev + 1)
  }

  const resetAll = () => {
    setElapsedTime(0)
    setUpdateTimesList(0)
  }
  return (
    <main className="App">
      <section className="stopwatch-container">
        <div className="main-timer-container">
          <MainTimer elapsedTime={elapsedTime} />

          <Buttons toggleIsTimeRunning={toggleIsTimeRunning} isTimeRunning={isTimeRunning} elapsedTime={elapsedTime} addElapsedTime={addElapsedTime} resetAll={resetAll} />
        </div>
        <section className="laps-container">
          <LapContainer elapsedTime={elapsedTime} updateTimesList={updateTimesList} />
        </section>
      </section>
    </main>
  )
}

export default App
