import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

type TSearchState = {
    value: string | null
}

const defaultState: TSearchState = {
    value: null,
}

const searchSlice = createSlice({
    name: 'search',
    initialState: defaultState,
    reducers: {
        setValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    },
});

export const { setValue } = searchSlice.actions;

export const { reducer } = searchSlice;

// selectors

export const getSearchValueSelector = (state: RootState) => state.search.value;
