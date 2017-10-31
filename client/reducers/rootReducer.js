import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { SIGNOUT_USER_SUCCESS } from '../constants/actionTypes';

const appReducer = combineReducers({
  authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT_USER_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
