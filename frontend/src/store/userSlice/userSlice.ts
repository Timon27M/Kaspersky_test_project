import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../../assets/types";
import type { RootState } from "..";

type TDefaultState = {
  userData: TUser;
};

const defaultState: TDefaultState = {
  userData: {
    name: "",
    email: "",
    surname: "",
    login: "",
    group: "unknown",
    _id: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    setUserData: (state, action: PayloadAction<TUser>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export const { reducer } = userSlice;

//selectors
export const getUserDataSelector = (state: RootState) => state.user.userData;
export const getUserIdSelector = (state: RootState) => state.user.userData._id;
