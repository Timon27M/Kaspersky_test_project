import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { TUser } from "../../assets/types";
import { getActiveUsersByGroupHistory } from "../../assets/utils/getActiveUsersByGroupHistory";
import { getUsers } from "../thunks";

type TSearchState = {
  activeUserCardsName: string;
  users: TUser[];
  isLoading: boolean;
  errorMessage: string | null;
};

const defaultState: TSearchState = {
  activeUserCardsName: getActiveUsersByGroupHistory(),
  users: [],
  isLoading: true,
  errorMessage: null
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
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getUsers.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "Ошибка загрузки";
      });
  },
});

export const { setActiveUserCardsName, setUsers } = usersSlice.actions;
export const { reducer } = usersSlice;

// Selectors
export const getActiveUserCardsSelector = (state: RootState) =>
  state.users.activeUserCardsName;
export const getIsLoading = (state: RootState) => state.users.isLoading;
export const getErrorMessage = (state: RootState) => state.users.errorMessage;
export const getUsersSelector = (state: RootState) => state.users.users;
