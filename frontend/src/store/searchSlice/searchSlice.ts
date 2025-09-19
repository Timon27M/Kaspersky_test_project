import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
