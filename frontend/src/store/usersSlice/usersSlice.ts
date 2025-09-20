import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { TUser } from "../../assets/types";
import { getActiveUsersByGroupHistory } from "../../assets/utils/getActiveUsersByGroupHistory";

type TSearchState = {
  activeUserCardsName: string;
  users: TUser[];
};

const defaultState: TSearchState = {
  activeUserCardsName: getActiveUsersByGroupHistory(),
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: defaultState,
  reducers: {
    setActiveUserCardsName: (state, action: PayloadAction<string>) => {
      state.activeUserCardsName = action.payload;
    },
    setUsers: (state, action: PayloadAction<TUser[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setActiveUserCardsName, setUsers } = usersSlice.actions;
export const { reducer } = usersSlice;

// Selectors
export const getActiveUserCardsSelector = (state: RootState) =>
  state.userCards.activeUserCardsName;
export const getUsersSelector = (state: RootState) => state.userCards.users;

