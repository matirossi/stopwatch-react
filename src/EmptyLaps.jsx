import { useEffect, useState } from "react"

const EmptyLaps = ({numberOfEmptyLaps}) => {
    const [emptyLaps, setEmptyLaps] = useState([])

    useEffect(()=> {
        if(numberOfEmptyLaps >= 0) {
            const newArr = []
            newArr.length = numberOfEmptyLaps
            newArr.fill(null)
            setEmptyLaps(newArr)
        }
    }, [numberOfEmptyLaps])

    return(
        <>
        {emptyLaps.map((lap, index) => {
            return <li key={index} className="lap"></li>
        })}
        </>
    )
}

export default EmptyLaps