import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  aliasForWrapper: string;
  hasPlayedIntro: boolean;
  needStyledStatusBar: boolean;
  loading: boolean;
}

const initialState = {
  aliasForWrapper: 'intro',
  hasPlayedIntro: false,
  needStyledStatusBar: false,
  loading: false,
} as InitialState;

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    playIntro(state) {
      state.hasPlayedIntro = true;
      state.aliasForWrapper = 'default';
    },
    setStatusBarIntroStyle(state) {
      state.aliasForWrapper = 'intro';
    },
    setStatusBarDefaultStyle(state) {
      state.aliasForWrapper = 'default';
    },
    setStatusBarLightStyle(state) {
      state.aliasForWrapper = 'light';
    },
  },
});

export const {
  playIntro,
  setStatusBarIntroStyle,
  setStatusBarDefaultStyle,
  setStatusBarLightStyle,
} = navigationSlice.actions;
export default navigationSlice.reducer;
