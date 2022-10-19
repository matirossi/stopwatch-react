const Buttons = ({ handleStartStop, isTimeRunning, elapsedTime, addElapsedTime, resetAll }) => {

    return (
        <div className="buttons-container">
            <button className="lap-reset-button" disabled={!elapsedTime ? true : false} onClick={isTimeRunning ? addElapsedTime : resetAll}>{(!isTimeRunning && elapsedTime) ? "reset" : "Lap"}</button>
            <button className={isTimeRunning ? "stop-button" : "start-button"} onClick={handleStartStop}>{isTimeRunning ? "Stop" : "Start"}</button>
        </div>
    )
}

export default Buttons