export function isOnlyNumbers(input: string): boolean {
    const regexPattern = /^[0-9]+$/; 
    return regexPattern.test(input);
  }