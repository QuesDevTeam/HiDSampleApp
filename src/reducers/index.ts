import { combineReducers, PayloadAction } from '@reduxjs/toolkit';

import auth from './auth';
import badge from './badge';
import common from './common';
import language from './language';
import navigation from './navigation';

const reducers = combineReducers({
  auth,
  badge,
  common,
  language,
  navigation,
});
export type RootState = ReturnType<typeof reducers>;

export default (state: any, action: PayloadAction) => {
  if (action.type === 'RESET_ALL_STATE') {
    return reducers(undefined, action);
  } else {
    return reducers(state, action);
  }
};
