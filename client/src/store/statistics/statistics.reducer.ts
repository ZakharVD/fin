import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TStatistics } from "../../types/statistics.types"

type TInitState = {
  statistics: TStatistics
}

const initialState: TInitState = {
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

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState: initialState,
  reducers: {
    setStatistics(state, action: PayloadAction<TStatistics>) {
      state.statistics = action.payload
    },
  },
})

export const { setStatistics } = statisticsSlice.actions
export const statisticsReducer = statisticsSlice.reducer
