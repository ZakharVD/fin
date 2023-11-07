/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../types/user.types";

type TInitState = {
    currentUser: TUser | null
}

const initialState: TInitState = {
    currentUser: null
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<TUser>) {
            state.currentUser = action.payload
        },
        clearUser: () => initialState
    }
})

export const { setCurrentUser, clearUser } = userSlice.actions
export const userReducer = userSlice.reducer