import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { updateTimer } from './utils'
import './App.css'

function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [startingTime, setStartingTime] = useState(0)
  const [timeAtPause, setTimeAtPause] = useState(0)
  const [formattedTime, setFormattedTime] = useState("")
  let animationFrameId
  //setFormattedTime(updateTimer(elapsedTime))

  return (
    <div className="App">
                <div className="main-timer-container">
              <span className="main-timer">0000</span>
              <div className="buttons-container">
                  <button className="start-button" >start</button>
                  <button className="stop-button" >stop</button>
              </div>
          </div>
    </div>
  )
}

export default App
