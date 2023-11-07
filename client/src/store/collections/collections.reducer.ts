import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TCollection } from "../../types/collections.types"


type TInitState = {
    collections: TCollection[] | []
}

const initialState: TInitState = {
    collections: []
}

export const collectionsSlice = createSlice({
    name: "collections",
    initialState: initialState,
    reducers: {
        setCollections(state, action: PayloadAction<TCollection[]>) {
            state.collections = action.payload
        },
        clearCollections: () => initialState
    }
})

export const {setCollections, clearCollections} = collectionsSlice.actions
export const collectionsReducer = collectionsSlice.reducer