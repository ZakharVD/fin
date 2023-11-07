import { RootState } from "../store";

export function selectIncome(state: RootState) {
    return state.income
}