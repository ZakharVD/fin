export default function getCurrentDay(): string {
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentDayFormatted = currentDay.toString()
  return currentDayFormatted
}
