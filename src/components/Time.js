import { useOnHold } from "../hooks/useOnHold"
import { utilService } from "../services/utilService"
import { Icons } from "./Icons"

export function Time({
    time,
    setTime
}) {

    const hour = +time.split(':')[0]
    const minute = +time.split(':')[1]

    const changedHour = (hour) => {
        if (hour === -1) return 23
        else if (hour === 24) return 0
        return hour
    }

    const changedMinute = (minute) => {
        if (minute === -1) return 59
        else if (minute === 60) return 0
        return minute
    }

    const incHour = () => {
        setTime((prev) => {
            const hour = +prev.split(':')[0]
            const minute = +prev.split(':')[1]
            return `${utilService.addZeroIfNeed(changedHour(hour + 1))}:${utilService.addZeroIfNeed(minute)}`
        })
    }

    const decHour = () => {
        setTime((prev) => {
            const hour = +prev.split(':')[0]
            const minute = +prev.split(':')[1]
            return `${utilService.addZeroIfNeed(changedHour(hour - 1))}:${utilService.addZeroIfNeed(minute)}`
        })
    }

    const incMinute = () => {
        setTime((prev) => {
            const hour = +prev.split(':')[0]
            const minute = +prev.split(':')[1]
            return `${hour}:${utilService.addZeroIfNeed(changedMinute(minute + 1))}`
        })
    }

    const decMinute = () => {
        setTime((prev) => {
            const hour = +prev.split(':')[0]
            const minute = +prev.split(':')[1]
            return `${hour}:${utilService.addZeroIfNeed(changedMinute(minute - 1))}`
        })
    }

    const incHourHandlers = useOnHold(incHour)
    const decHourHandlers = useOnHold(decHour)
    const incMinuteHandlers = useOnHold(incMinute)
    const decMinuteHandlers = useOnHold(decMinute)

    return (
        <div className="time flex align-center">
            <div className="hour flex column">
                <button
                    {...incHourHandlers}
                    onClick={incHour}
                >
                    <Icons icon={'add'} />
                </button>
                <span>{utilService.addZeroIfNeed(hour)}</span>
                <button
                    {...decHourHandlers}
                    onClick={decHour}
                >
                    <Icons icon={'inc'} />
                </button>
            </div>
            <span>:</span>
            <div className="minute flex column">
                <button
                    {...incMinuteHandlers}
                    onClick={incMinute}
                >
                    <Icons icon={'add'} />
                </button>
                <span>{utilService.addZeroIfNeed(minute)}</span>
                <button
                    {...decMinuteHandlers}
                    onClick={decMinute}
                >
                    <Icons icon={'inc'} />
                </button>
            </div>
        </div>
    )
}