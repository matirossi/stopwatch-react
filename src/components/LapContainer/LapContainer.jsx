import { useEffect, useState } from "react"
import updateTimer from "../../utils"
import EmptyLaps from "../../EmptyLaps.jsx"

const LapContainer = ({ elapsedTime, laps, totalLapsElapsedTime, maxLap, minLap}) => {

    return (
        <ul className="laps-list">
            {elapsedTime > 0 && <li className="lap"><span>Lap {laps.length + 1}</span><span>{updateTimer(elapsedTime - totalLapsElapsedTime)}</span></li>}

            {laps && laps.map((lapObj) => {
                return (laps.length > 1 && lapObj.lapNumber === maxLap.lapNumber) ? <li key={lapObj.lapNumber} className="lap max-value-lap"><span>Lap {lapObj.lapNumber}</span><span>{updateTimer(lapObj.lapElapsedTime)}</span></li>
                : (laps.length > 1 && lapObj.lapNumber === minLap.lapNumber) ? <li key={lapObj.lapNumber} className="lap min-value-lap"><span>Lap {lapObj.lapNumber}</span><span>{updateTimer(lapObj.lapElapsedTime)}</span></li>
                :  <li key={lapObj.lapNumber} className="lap"><span>Lap {lapObj.lapNumber}</span><span>{updateTimer(lapObj.lapElapsedTime)}</span></li>
            })}

            <EmptyLaps numberOfEmptyLaps={6 - laps.length} /> 
        </ul>
    )
}

export default LapContainer