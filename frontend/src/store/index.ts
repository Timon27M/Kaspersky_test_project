import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as searchReducer } from "./searchSlice/searchSlice";
import { reducer as userCardsReducer } from "./usersSlice/usersSlice";
import { reducer as userReducer } from "./userSlice/userSlice"

export const reducer = combineReducers({
  search: searchReducer,
  userCards: userCardsReducer,
  user:userReducer
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
