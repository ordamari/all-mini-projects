import { useEffect, useState } from "react"
import { useOnHold } from "../hooks/useOnHold";
import useTranslation from "../hooks/useTranslation"
import { dateService } from "../services/dateService"
import { Icons } from "./Icons"

export function RangeCalander({
    startDate = new Date(),
    endDate = new Date(),
    setStartDate,
    setEndDate
}) {

    const [showDate, setShowDate] = useState(startDate);
    const [hoveredDate, setHoveredDate] = useState(null);
    const { t } = useTranslation()
    const startMonth = dateService.startMonth(showDate);
    const endMonth = dateService.endMonth(showDate);
    const currMonthDays = dateService.diffrenceInDays(startMonth, endMonth) + 1;
    const startMonthDay = startMonth.getDay();
    const endMonthDay = endMonth.getDay();
    const prevMonthDate = dateService.prevMonth(showDate)
    const nextMonthDate = dateService.nextMonth(showDate)
    const prevMonthLastDay = dateService.endMonth(prevMonthDate).getDate();
    const isSameDates = dateService.isSameDate(startDate, endDate)

    const onShowedMonthDateClicked = (selectedDate) => {
        if (isSameDates) {
            if (dateService.isSameDate(startDate, selectedDate)) return;
            if (selectedDate > startDate) setEndDate(selectedDate)
            else setStartDate(selectedDate)
        } else {
            setStartDate(selectedDate)
            setEndDate(selectedDate)
        }
    }

    const onUnshowedMonthClicked = (selectedDate) => {
        onShowedMonthDateClicked(selectedDate)
        setShowDate(selectedDate);
    }

    const prevMonth = () => {
        setShowDate(prev => dateService.prevMonth(prev));
    }

    const nextMonth = () => {
        setShowDate(prev => dateService.nextMonth(prev));
    }

    const prevYear = () => {
        setShowDate(prev => dateService.prevYear(prev));
    }

    const nextYear = () => {
        setShowDate(prev => dateService.nextYear(prev));
    }

    const prevMonthHandler = useOnHold(prevMonth)
    const nextMonthHandler = useOnHold(nextMonth)
    const prevYearHandler = useOnHold(prevYear)
    const nextYearHandler = useOnHold(nextYear)


    return (
        <div className="calander" >
            <div className="month-change">
                <button
                    className="dec-year"
                    {...prevYearHandler}
                    onClick={prevYear}
                >
                    <Icons icon='double-arrow-left' />
                </button>
                <button
                    {...prevMonthHandler}
                    className="dec-month"
                    onClick={prevMonth}
                >
                    <Icons icon='arrow-left' />
                </button>
                <span className="selected-month">
                    {t(`month.${showDate.getMonth()}`)} {showDate.getFullYear()}
                </span>
                <button
                    {...nextMonthHandler}
                    className="inc-month"
                    onClick={nextMonth}
                >
                    <Icons icon='arrow-right' />
                </button>
                <button
                    {...nextYearHandler}
                    className="inc-year"
                    onClick={nextYear}
                >
                    <Icons icon='double-arrow-right' />
                </button>
            </div>
            <div className="week-days">
                {
                    Array.from(Array(7).keys()).map(day => (
                        <div key={day} className="week-day">
                            {t(`day.${day}`)}
                        </div>
                    ))
                }
            </div>
            <div
                onMouseLeave={() => setHoveredDate(null)}
                className="calender-days"
            >
                <div className="month-days">
                    {
                        Array.from(Array(startMonthDay).keys()).map(idx => {
                            const day = prevMonthLastDay - startMonthDay + idx + 1
                            const cellDate = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), day)
                            // const isSelectedDate = false // dateService.isSameDate(date, cellDate)
                            const isSelectedDate = (
                                dateService.isSameDate(startDate, cellDate) ||
                                dateService.isSameDate(endDate, cellDate) ||
                                dateService.isInRange([startDate, endDate], cellDate)
                            )
                            const isToday = dateService.isToday(cellDate)
                            const isHovered = (
                                dateService.isSameDate(startDate, endDate) &&
                                dateService.isInRange([startDate, hoveredDate], cellDate)
                            )
                            return (
                                <button
                                    onMouseOver={() => setHoveredDate(cellDate)}
                                    key={day}
                                    className={`prev-month-day ${isSelectedDate ? 'selected' : ''
                                        } ${isToday ? 'today' : ''} ${isHovered ? 'hovered' : ''
                                        }`}
                                    onClick={() => { onUnshowedMonthClicked(cellDate) }}
                                >
                                    {day}
                                </button>
                            )
                        }
                        )
                    }
                    {
                        Array.from(Array(currMonthDays).keys()).map(idx => {
                            const day = idx + 1
                            const cellDate = new Date(showDate.getFullYear(), showDate.getMonth(), day)
                            // const isSelectedDate = false // dateService.isSameDate(cellDate, date)
                            const isSelectedDate = (
                                dateService.isSameDate(startDate, cellDate) ||
                                dateService.isSameDate(endDate, cellDate) ||
                                dateService.isInRange([startDate, endDate], cellDate)
                            )
                            const isToday = dateService.isToday(cellDate)
                            const isHovered = (
                                dateService.isSameDate(startDate, endDate) &&
                                dateService.isInRange([startDate, hoveredDate], cellDate)
                            )
                            return (
                                <button
                                    key={day}
                                    onMouseOver={() => setHoveredDate(cellDate)}
                                    className={`this-month-day ${isSelectedDate ? 'selected' : ''
                                        } ${isToday ? 'today' : ''} ${isHovered ? 'hovered' : ''
                                        }`}
                                    onClick={() => { onShowedMonthDateClicked(cellDate) }}
                                >
                                    {day}
                                </button>
                            )
                        }
                        )
                    }
                    {
                        Array.from(Array(6 - endMonthDay).keys()).map(idx => {
                            const day = idx + 1
                            const cellDate = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), day)
                            // const isSelectedDate = false //  dateService.isSameDate(cellDate, date)
                            const isSelectedDate = (
                                dateService.isSameDate(startDate, cellDate) ||
                                dateService.isSameDate(endDate, cellDate) ||
                                dateService.isInRange([startDate, endDate], cellDate)
                            )
                            const isToday = dateService.isToday(cellDate)
                            const isHovered = (
                                dateService.isSameDate(startDate, endDate) &&
                                dateService.isInRange([startDate, hoveredDate], cellDate)
                            )
                            return (
                                <button
                                    key={day}
                                    onMouseOver={() => setHoveredDate(cellDate)}
                                    className={`next-month-day ${isSelectedDate ? 'selected' : ''
                                        } ${isToday ? 'today' : ''} ${isHovered ? 'hovered' : ''
                                        }`}
                                    onClick={() => { onUnshowedMonthClicked(cellDate) }}
                                >
                                    {day}
                                </button>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )
}