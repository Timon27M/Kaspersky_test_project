import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { TUser } from '../../assets/types';

type TSearchState = {
    activeUserCardsName: string;
    users: TUser[];
}

const defaultState: TSearchState = {
    activeUserCardsName: "all",
    users: [],
}

const usersSlice = createSlice({
    name: 'userCards',
    initialState: defaultState,
    reducers: {
        setActiveUserCardsName: (state, action: PayloadAction<string>) => {
            state.activeUserCardsName = action.payload
        },
        setUsers: (state, action: PayloadAction<TUser[]>) => {
            state.users = action.payload
        }
    },
});

export const activeUserSelector = (state: RootState) => state.userCards.activeUserCardsName;

export const { setActiveUserCardsName, setUsers } = usersSlice.actions;

export const { reducer } = usersSlice;
