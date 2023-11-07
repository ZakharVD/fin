import { TExpense } from "../types/expenses.types";

export function calculateTotalAmount(data: TExpense[]) {
    let totalAmount = 0;
  
    for (const item of data) {
      const amount = parseFloat(item.amount); // Parse the amount as a floating-point number
      if (!isNaN(amount)) {
        totalAmount += amount;
      }
    }
  
    return totalAmount;
  }