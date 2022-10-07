import { useEffect, useState } from "react"
import updateTimer from "../../utils"

const LapContainer = ({ elapsedTime, updateTimesList}) => {
    const [timesList, setTimesList] = useState([])
    const totalLapsElapsedTime = timesList.reduce((prev, curr) => prev + curr, 0)

    let longestElapsedTimeIndex
    let shortestElapsedTimeIndex
    if(timesList.length > 1) {
        longestElapsedTimeIndex = timesList.indexOf(Math.max(...timesList))
        shortestElapsedTimeIndex = timesList.indexOf(Math.min(...timesList))
    }

    useEffect(() => {
        console.log("effect")
        if(updateTimesList > 0){
            const newLapTime = timesList.reduce((prev,curr)=> prev-curr, elapsedTime)
            setTimesList([newLapTime, ...timesList])

        }
        console.log("timeList", timesList)
    }, [updateTimesList])


    return (
        <ul className="laps-list">
            <li className="lap"><span>Lap {timesList.length + 1}</span><span>{updateTimer(elapsedTime - totalLapsElapsedTime)}</span></li>
            {timesList && timesList.map((lapTime, index) => { 
                if(index === longestElapsedTimeIndex) return <li key={index} className="lap max-value-lap"><span>Lap {timesList.length -index}</span><span>{updateTimer(lapTime)}</span></li> 
                if(index === shortestElapsedTimeIndex) return <li key={index} className="lap min-value-lap"><span>Lap {timesList.length -index}</span><span>{updateTimer(lapTime)}</span></li> 
                return <li key={index} className="lap"><span>Lap {timesList.length -index}</span><span>{updateTimer(lapTime)}</span></li> })}
        </ul>

    )
}

export default LapContainer