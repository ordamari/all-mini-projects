export const timeService = {
    formatDuration
}


const leadingZeroFormatter = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 })

function formatDuration(time) {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 360)
    if (hours === 0) return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
}


