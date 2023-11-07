import { RootState } from "../store";

export function selectGoal(state: RootState) {
    return state.goals.goal
}