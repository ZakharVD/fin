import { RootState } from "../store";

export function selectStatistics(state: RootState) {
    return state.statistics.statistics
}