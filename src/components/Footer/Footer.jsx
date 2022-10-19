import "./Footer.css"
import { Alarm, Globe, Stopwatch, Timer } from "../SvgComponents/SvgComponents"
export const Footer = ({...props}) => {
    return (
        <footer className="footer-menu">
            <button className="footer-button"><Globe/><span>World Clock</span></button>
            <button className="footer-button"><Alarm/><span>Alarm</span></button>
            <button className="footer-button stopwatch-button"><Stopwatch/><span>Stopwatch</span></button>
            <button className="footer-button"><Timer/><span>Timer</span></button>
        </footer>
    )
}