const Buttons = ({toggleIsTimeRunning, isTimeRunning, elapsedTime, addElapsedTime}) => {
    return (
        <div className="buttons-container">
            {!isTimeRunning && (!elapsedTime?  <button className="disabled-button">Lap</button> : <button className="enabled-button">reset</button>)}
            {isTimeRunning && <button className="enabled-button" onClick={addElapsedTime}>Lap</button>}
            {!isTimeRunning && <button className="start-button" onClick={toggleIsTimeRunning}>Start</button>}
            {isTimeRunning && <button className="stop-button" onClick={toggleIsTimeRunning}>Stop</button>}
        </div>
    )
}

export default Buttons