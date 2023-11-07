import { RootState } from "../store";

export function selectExpenses(state: RootState) {
    return state.expenses
}