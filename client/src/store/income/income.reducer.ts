import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TIncome } from "../../types/income.types"

type TInitState = {
    id: null | string
    amount: number
    collectionId:  null | string
    userId:  null | string
}

const initialState: TInitState = {
    id: null,
    amount: 0,
    collectionId: null,
    userId: null,
}

export const incomeSlice = createSlice({
    name: "income",
    initialState: initialState,
    reducers: {
        setIncome(state, action: PayloadAction<TIncome>) {
            state.amount = action.payload.amount
            state.id = action.payload.id
            state.collectionId = action.payload.collectionId
            state.userId = action.payload.userId
        },
        clearIncome: () => initialState
    }
})

export const {setIncome, clearIncome} = incomeSlice.actions
export const incomeReducer = incomeSlice.reducer