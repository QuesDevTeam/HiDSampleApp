import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
  needActionFloatingButton: boolean;
}

const initialState = { loading: false, needActionFloatingButton: false } as InitialState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    startLoading(state) {
      return {
        ...state,
        loading: true,
      };
    },
    endLoading(state) {
      return {
        ...state,
        loading: false,
      };
    },
    setNeedActionFloatingButton(state) {
      return {
        ...state,
        needActionFloatingButton: true,
      };
    },
    resetNeedActionFloatingButton(state) {
      return {
        ...state,
        needActionFloatingButton: false,
      };
    },
  },
});

export const {
  startLoading,
  endLoading,
  setNeedActionFloatingButton,
  resetNeedActionFloatingButton,
} = commonSlice.actions;
export default commonSlice.reducer;
