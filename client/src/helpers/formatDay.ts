export function formatDay(day: string): string {
    let formattedDay
    if (day.startsWith("0")) {
        formattedDay = day
    } else if (Number(day) < 10) {
        formattedDay = `0${day}`
    } else {
        formattedDay = day
    }
    return formattedDay
}