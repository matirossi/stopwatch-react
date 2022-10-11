import { useEffect, useState } from "react"
import updateTimer from "../../utils"

const LapContainer = ({ elapsedTime, laps, totalLapsElapsedTime, maxLap, minLap}) => {

useEffect(()=> console.log(minLap, maxLap), [minLap, maxLap])
/*     const emptyLaps = [null, null, null, null, null, null, null]
    if (elapsedTime > 0) emptyLaps.length -= 1
    if (timesList.length < 5) emptyLaps.length -= timesList.length
    if (timesList.length > 4) emptyLaps.length = 0 */

    return (
        <ul className="laps-list">
            {/* elapsedTime === 0 && emptyLaps.map((lap, index) => { return <li key={index} className="lap"></li> }) */}
            {elapsedTime > 0 && <li className="lap"><span>Lap {laps.length + 1}</span><span>{updateTimer(elapsedTime - totalLapsElapsedTime)}</span></li>}

            {laps && laps.map((lapObj) => {
                return (laps.length > 1 && lapObj.lapNumber === maxLap.lapNumber) ? <li key={lapObj.lapNumber} className="lap max-value-lap"><span>Lap {lapObj.lapNumber}</span><span>{updateTimer(lapObj.lapElapsedTime)}</span></li>
                : (laps.length > 1 && lapObj.lapNumber === minLap.lapNumber) ? <li key={lapObj.lapNumber} className="lap min-value-lap"><span>Lap {lapObj.lapNumber}</span><span>{updateTimer(lapObj.lapElapsedTime)}</span></li>
                :  <li key={lapObj.lapNumber} className="lap"><span>Lap {lapObj.lapNumber}</span><span>{updateTimer(lapObj.lapElapsedTime)}</span></li>
            })}

            {/* elapsedTime > 0 && emptyLaps && emptyLaps.map((lap, index) => { return <li key={index} className="lap"></li> }) */}
            {/* <EmptyLaps numberOfEmptyLaps={8 - laps.length} /> */}
        </ul>
    )
}

export default LapContainer