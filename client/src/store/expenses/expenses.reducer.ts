import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TExpense } from "../../types/expenses.types"
import { TStatistics } from "../../types/statistics.types"

type TInitState = {
    expenses: TExpense[] | []
    totalExpense: number
    statistics: TStatistics
}

type TPayload = {
    expenses: TExpense[],
    totalExpense: number,
    statistics: TStatistics

}

const initialState: TInitState = {
    expenses: [],
    totalExpense: 0,
    statistics: {
        housing: 0,
        food: 0,
        transportation: 0,
        health: 0,
        entertainment: 0,
        education: 0,
        debt: 0,
        other: 0,
      },
}

export const expensesSlice = createSlice({
    name: "expenses",
    initialState: initialState,
    reducers: {
        setExpenses(state, action: PayloadAction<TPayload>) {
            state.expenses = action.payload.expenses
            state.totalExpense = action.payload.totalExpense
            state.statistics = action.payload.statistics
        },
        clearExpenses: () => initialState
    }
})

export const {setExpenses, clearExpenses} = expensesSlice.actions
export const expensesReducer = expensesSlice.reducer