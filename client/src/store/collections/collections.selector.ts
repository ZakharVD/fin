import { RootState } from "../store";

export function selectCollections(state: RootState) {
    return state.collections.collections
}