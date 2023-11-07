import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TGoal } from "../../types/goals.types"

const initialState = {
  goal: {
    id: "",
    name: "",
    targetAmount: 0,
    amount: 0,
    userId: "",
  },
}

export const goalsSlice = createSlice({
  name: "goals",
  initialState: initialState,
  reducers: {
    setGoal(state, action: PayloadAction<TGoal>) {
      state.goal = action.payload
    },
  },
})

export const { setGoal } = goalsSlice.actions
export const goalsReducer = goalsSlice.reducer
