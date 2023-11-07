export function getCurrentMonth(): string {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0")
  const defaultValue = `${currentYear}-${currentMonth}`
  return defaultValue
}
