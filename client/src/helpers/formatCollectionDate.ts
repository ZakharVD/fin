export function formatCollectionDate(inputValue: string): string {
    const [year, month] = inputValue.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const formattedDate = `${monthNames[parseInt(month) - 1]} ${year}`;
    return formattedDate;
  }