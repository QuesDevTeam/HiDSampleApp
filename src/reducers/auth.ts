import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  token: string;
  needLogout: boolean;
}

const initialState = {
  token: '',
  needLogout: false,
} as InitialState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.token = payload.token;
    },
    setNeedLogout: (state) => {
      state.needLogout = true;
    },
    resetLogin: (state) => {
      state.token = '';
      state.needLogout = false;
    },
  },
});

export const { setLogin, setNeedLogout, resetLogin } = authSlice.actions;
export default authSlice.reducer;
