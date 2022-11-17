import { useEffect, useState } from "react";
import { DatePicker } from "../../../components/DatePicker";
import { DateRangePicker } from "../../../components/DateRangePicker";
import { ImagePicker } from "../../../components/ImagePicker";
import { RangePicker } from "../../../components/RangePicker";
import { TimePicker } from "../../../components/TimePicker";

export function OutletPickers() {


    const [date, setDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [time, setTime] = useState('10:10');
    const [image, setImage] = useState('');
    const [range, setRange] = useState(0.1);

    return (
        <div className="outlet-pickers outlet flex column gap-1" >
            <div className="flex gap-1">
                <div className="full">
                    <ImagePicker
                        img={image}
                        setImg={setImage}
                    />
                </div>
                <div className="full flex column gap-1" >
                    <DatePicker
                        date={date}
                        setDate={setDate}
                    />
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        setStartDate={setStartDate}
                    />

                    <TimePicker
                        time={time}
                        setTime={setTime}
                    />
                </div>
            </div>
            <RangePicker
                value={range}
                onChange={setRange}
            />
        </div>

    )
}