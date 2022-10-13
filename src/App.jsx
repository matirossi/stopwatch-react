import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'
import Buttons from './components/Buttons/Buttons'
import MainTimer from './components/MainTimer/MainTimer'
import LapContainer from './components/LapContainer/LapContainer'

function App() {
  const lapsReducer = (state, action) => {
    switch (action.type) {
        case 'addNewLap':
            return { ...state, laps: [action.newLap, ...state.laps], totalLapsElapsedTime: elapsedTime }
        case 'updateMaxLap':
            return { ...state, maxLap: action.newLap }
        case 'updateMinLap':
            return { ...state, minLap: action.newLap }
        case 'resetAll':
            return { laps: [], maxLap: { lapElapsedTime: 0 }, minLap: { lapElapsedTime: Infinity }, totalLapsElapsedTime: 0 }
    }
}
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [{laps, maxLap, minLap, totalLapsElapsedTime}, lapsDispatch] = useReducer(lapsReducer, {laps: [], maxLap:{lapElapsedTime: 0}, minLap: {lapElapsedTime: Infinity}, totalLapsElapsedTime: 0} )

  //const intervalId = useRef(0)
  
  const runTimer = (startingDate) => {
    const currentDate = Date.now()
    setElapsedTime(currentDate - startingDate )
  }
    useEffect(() => {
    let intervalId
    const startingDate = Date.now() - elapsedTime
    if (isTimeRunning) {
      intervalId = setInterval(runTimer, 10, startingDate)
    }
    if (!isTimeRunning) {
      clearInterval(intervalId)
    }
    return () => { clearInterval(intervalId) } 
  }, [isTimeRunning]);
  
  const calculateMaxLap = (newLap) => {
    if (newLap.lapElapsedTime > maxLap.lapElapsedTime) {lapsDispatch({type: 'updateMaxLap', newLap: newLap})}
  }
  const calculateMinLap = (newLap) => {
    if (newLap.lapElapsedTime < minLap.lapElapsedTime) {lapsDispatch({type: 'updateMinLap', newLap: newLap})}
  }
  
  const addNewLap = () => {
    const lapNumber = laps.length + 1
    const lapElapsedTime = elapsedTime - totalLapsElapsedTime
    const newLap = {lapNumber, lapElapsedTime}
    lapsDispatch({type: 'addNewLap', newLap: newLap})
    calculateMaxLap(newLap)
    calculateMinLap(newLap)
  }
  
  const resetAll = () => {
    setElapsedTime(0)
    lapsDispatch({type: 'resetAll'})
  }

  const handleStartStop = () => {
  /*   if(isTimeRunning) clearInterval(intervalId.current)
    if(!isTimeRunning){
      const startingDate = Date.now() - elapsedTime
      intervalId.current = setInterval(runTimer, 10, startingDate )
    } */
    setIsTimeRunning(!isTimeRunning)
  }
  return (
    <main className="App">
      <section className="stopwatch-container">
        <section className="main-timer-container">
          <MainTimer elapsedTime={elapsedTime} />
          <Buttons handleStartStop={handleStartStop} isTimeRunning={isTimeRunning} elapsedTime={elapsedTime} addElapsedTime={addNewLap} resetAll={resetAll} />
        </section>
        <section className="laps-container">
          <LapContainer elapsedTime={elapsedTime} laps={laps} totalLapsElapsedTime={totalLapsElapsedTime} maxLap={maxLap} minLap={minLap}/>
        </section>
      </section>
    </main>
  )
}

export default App
