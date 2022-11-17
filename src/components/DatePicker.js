import { dateService } from '../services/dateService';
import { Calander } from './Calander';
import { Dropdown } from './Dropdown';

export function DatePicker({
    date,
    setDate
}) {

    const dateText = dateService.formating(date);

    return (


        <div className="date-picker">
            <Dropdown
                icon='calendar'
                text={dateText}
            >
                <div onClick={(e) => e.stopPropagation()} >
                    <Calander
                        date={date}
                        setDate={setDate}
                    />
                </div>
            </Dropdown>
        </div>
    )
}