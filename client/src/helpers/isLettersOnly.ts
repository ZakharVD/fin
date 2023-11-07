export function isOnlyLetters(name: string): boolean {
  const regexPattern = /^[A-Za-z\s]+$/
  return regexPattern.test(name)
}
