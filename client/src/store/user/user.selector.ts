import { RootState } from "../store";

export function selectCurrentUser(state: RootState) {
    return state.user.currentUser
}