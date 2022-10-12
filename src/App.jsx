import { useEffect, useState, useReducer } from 'react'
import './App.css'
import Buttons from './components/Buttons/Buttons'
import MainTimer from './components/MainTimer/MainTimer'
import LapContainer from './components/LapContainer/LapContainer'


function App() {
  const [elapsedTime, setElapsedTime] = useState(0) 
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [totalLapsElapsedTime, setTotalLapsElapsedTime] = useState(0) 
  const [laps, setLaps] = useState([])
  const [maxLap, setMaxLap] = useState({})
  const [minLap, setMinLap] = useState({})
  
  useEffect(() => {
    let intervalId
    const runTimer = (startingDate) => {
      const currentDate = Date.now()
      
      setElapsedTime(currentDate - startingDate)
    }
    const startingDate = Date.now() - elapsedTime
    if (isTimeRunning) {
      intervalId = setInterval(runTimer, 10, startingDate)
    }
    if (!isTimeRunning) {
      clearInterval(intervalId)
    }
    return () => { clearInterval(intervalId) } 
  }, [isTimeRunning]);

  const toggleIsTimeRunning = () => {
    setIsTimeRunning(!isTimeRunning)
  }

  const calculateMaxLap = (newLap) => {
    if (newLap.lapElapsedTime > maxLap.lapElapsedTime) setMaxLap({lapNumber: newLap.lapNumber, lapElapsedTime: newLap.lapElapsedTime})
    if (!maxLap.lapElapsedTime) setMaxLap({lapNumber: newLap.lapNumber, lapElapsedTime: newLap.lapElapsedTime})
  }
  const calculateMinLap = (newLap) => {
    if (newLap.lapElapsedTime < minLap.lapElapsedTime) setMinLap({lapNumber: newLap.lapNumber, lapElapsedTime: newLap.lapElapsedTime})
    if (!minLap.lapElapsedTime) setMinLap({lapNumber: newLap.lapNumber, lapElapsedTime: newLap.lapElapsedTime})
  }

  const addNewLap = () => {
    const lapNumber = laps.length + 1
    const previousLapsElapsedTime = laps.map(lapObj => lapObj.lapElapsedTime).reduce((acc, curr)=> acc + curr,0)
    const lapElapsedTime = elapsedTime - previousLapsElapsedTime
    const newLap = {lapNumber, lapElapsedTime}
    const newLapsArr = [newLap, ...laps]
    setLaps(newLapsArr)
    setTotalLapsElapsedTime(previousLapsElapsedTime + lapElapsedTime)
    calculateMaxLap(newLap)
    calculateMinLap(newLap)
  }

  const resetAll = () => {
    setElapsedTime(0)
    setTotalLapsElapsedTime(0)
    setLaps([])
  }
  return (
    <main className="App">
      <section className="stopwatch-container">
        <section className="main-timer-container">
          <MainTimer elapsedTime={elapsedTime} />
          <Buttons toggleIsTimeRunning={toggleIsTimeRunning} isTimeRunning={isTimeRunning} elapsedTime={elapsedTime} addElapsedTime={addNewLap} resetAll={resetAll} />
        </section>
        <section className="laps-container">
          <LapContainer elapsedTime={elapsedTime} laps={laps} totalLapsElapsedTime={totalLapsElapsedTime} maxLap={maxLap} minLap={minLap}/>
        </section>
      </section>
    </main>
  )
}

export default App
