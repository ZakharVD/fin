import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";
import { collectionsReducer } from "./collections/collections.reducer";
import { expensesReducer } from "./expenses/expenses.reducer";
import { incomeReducer } from "./income/income.reducer";
import { statisticsReducer } from "./statistics/statistics.reducer";
import { goalsReducer } from "./goals/goals.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    collections: collectionsReducer,
    expenses:expensesReducer,
    income: incomeReducer,
    statistics: statisticsReducer,
    goals: goalsReducer
})