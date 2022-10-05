const formatNumber = (number) => {
    return number.toString().padStart(2, "0")
}
export const updateTimer = (elapsedTime) => {
    const centiseconds = Math.floor(elapsedTime / 10) % 100
    const seconds = Math.floor(elapsedTime / 1000) % 60
    const minutes = Math.floor(elapsedTime / 1000 / 60) % 60

    return `${formatNumber(minutes)}:${formatNumber(seconds)}.${formatNumber(centiseconds)}`

}