import { dateService } from '../services/dateService';
import { Dropdown } from './Dropdown';
import { RangeCalander } from './RangeCalander';

export function DateRangePicker({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}) {

    const startDateText = dateService.formating(startDate);
    const endDateText = dateService.formating(endDate);

    return (


        <div className="date-picker">
            <Dropdown
                icon='calendar-range'
                text={`${startDateText} - ${endDateText}`}
            >
                <div onClick={(e) => e.stopPropagation()} >
                    <RangeCalander
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                </div>
            </Dropdown>
        </div>
    )
}