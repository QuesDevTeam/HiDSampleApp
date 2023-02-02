import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  targetTab: 'home' | 'settings' | '';
  needToRefreshForLanguage: boolean;
}

const initialState = {
  targetTab: '',
  needToRefreshForLanguage: false,
} as InitialState;

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setNeedToRefreshForLanguage: (state, { payload }) => {
      state.targetTab = payload.tab;
      state.needToRefreshForLanguage = true;
    },
    resetNeedToRefreshForLanguage: (state) => {
      state.targetTab = '';
      state.needToRefreshForLanguage = false;
    },
  },
});

export const { setNeedToRefreshForLanguage, resetNeedToRefreshForLanguage } = languageSlice.actions;
export default languageSlice.reducer;
