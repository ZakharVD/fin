export function isMonthInFuture(selectedMonth: string): boolean {
   // Split the selected month (e.g., "YYYY-MM") into year and month parts
   const [selectedYear, selectedMonthStr] = selectedMonth.split('-');
   const selectedMonthInt = parseInt(selectedMonthStr, 10) - 1; // Months are zero-based in JavaScript

   // Create a Date object for the selected month
   const selectedDate = new Date(parseInt(selectedYear, 10), selectedMonthInt);

   // Get the current date
   const currentDate = new Date();

   // Compare the selected date with the current date
   return selectedDate > currentDate;
  }