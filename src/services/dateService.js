export const dateService = {
    startMonth,
    endMonth,
    diffrenceInMs,
    diffrenceInDays,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    isToday,
    isSameDate,
    formating,
    isInRange
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

function startMonth(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
    );
}

function endMonth(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    );
}

function diffrenceInMs(date1, date2) {
    return Math.abs(date1.getTime() - date2.getTime())
}

function diffrenceInDays(date1, date2) {
    return Math.round(diffrenceInMs(date1, date2) / DAY)
}

function prevMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

function nextMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

function nextYear(date) {
    return new Date(date.getFullYear() + 1, date.getMonth(), 1);
}

function prevYear(date) {
    return new Date(date.getFullYear() - 1, date.getMonth(), 1);
}

function isToday(date) {
    const today = new Date();
    return isSameDate(date, today)
}

function isSameDate(date1, date2) {
    return (date1.toDateString() === date2.toDateString())
}

function isInRange(dates, date) {
    if (!date) return false;
    if (!dates[0]) return false;
    if (!dates[1]) return false;
    return (
        (
            date > dates[0] &&
            date < dates[1]
        ) || (
            date > dates[1] &&
            date < dates[0]
        ) ||
        isSameDate(dates[0], date) ||
        isSameDate(dates[1], date)
    )
}

function formating(date, format = { dateStyle: "medium" }, locale = "en-us") {
    return date.toLocaleString(locale, format)
}

