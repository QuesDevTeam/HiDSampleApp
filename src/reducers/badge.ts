import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  number: number;
}

const initialState = {
  number: 0,
} as InitialState;

const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {
    setBadgeNumber(state, { payload }) {
      state.number = payload;
    },
  },
});

export const { setBadgeNumber } = badgeSlice.actions;
export default badgeSlice.reducer;
