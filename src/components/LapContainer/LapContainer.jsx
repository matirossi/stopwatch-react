/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import updateTimer from "../../utils"

const LapContainer = ({ elapsedTime, updateTimesList }) => {
    const [timesList, setTimesList] = useState([])

    const totalLapsElapsedTime = timesList.reduce((prev, curr) => prev + curr, 0)

    let longestElapsedTimeIndex
    let shortestElapsedTimeIndex
    if (timesList.length > 1) {
        longestElapsedTimeIndex = timesList.indexOf(Math.max(...timesList))
        shortestElapsedTimeIndex = timesList.indexOf(Math.min(...timesList))
    }

    const emptyLaps = [null, null, null, null, null, null, null]
    if (elapsedTime > 0) emptyLaps.length -= 1
    if (timesList.length < 5) emptyLaps.length -= timesList.length
    if (timesList.length > 4) emptyLaps.length = 0

    useEffect(() => {
        if (updateTimesList === 0) { //reset timeList if updateTimeList is reseted
            setTimesList([])
        }
        if (updateTimesList > 0) {
            const newLapTime = timesList.reduce((prev, curr) => prev - curr, elapsedTime)
            setTimesList([newLapTime, ...timesList])

        }
    }, [updateTimesList])

    return (
        <ul className="laps-list">
            {elapsedTime === 0 && emptyLaps.map((lap, index) => { return <li key={index} className="lap"></li> })}
            {elapsedTime > 0 && <li className="lap"><span>Lap {timesList.length + 1}</span><span>{updateTimer(elapsedTime - totalLapsElapsedTime)}</span></li>}

            {timesList && timesList.map((lapTime, index) => {
                if (index === longestElapsedTimeIndex) return <li key={index} className="lap max-value-lap"><span>Lap {timesList.length - index}</span><span>{updateTimer(lapTime)}</span></li>
                if (index === shortestElapsedTimeIndex) return <li key={index} className="lap min-value-lap"><span>Lap {timesList.length - index}</span><span>{updateTimer(lapTime)}</span></li>
                return <li key={index} className="lap"><span>Lap {timesList.length - index}</span><span>{updateTimer(lapTime)}</span></li>
            })}

            {elapsedTime > 0 && emptyLaps && emptyLaps.map((lap, index) => { return <li key={index} className="lap"></li> })}
        </ul>
    )
}

export default LapContainer