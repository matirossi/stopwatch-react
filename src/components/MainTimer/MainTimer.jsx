import {updateTimer} from "../../utils"
const MainTimer = ({elapsedTime}) => {
    return(
        <div className="timer-container">
        <p className="main-timer">{updateTimer(elapsedTime)}</p>
        </div>
    )
}

export default MainTimer