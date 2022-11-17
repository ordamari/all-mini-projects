import { Dropdown } from "./Dropdown";
import { Time } from "./Time";

export function TimePicker({
    time,
    setTime
}) {
    return (
        <div className="time-picker">
            <Dropdown
                icon='time'
                text={time}
            >
                <div onClick={(e) => e.stopPropagation()} >
                    <Time
                        time={time}
                        setTime={setTime}
                    />
                </div>
            </Dropdown>
        </div>
    )
}