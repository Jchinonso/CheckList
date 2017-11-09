import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todosReducer from './todosReducer';
import tasksReducer from './tasksReducer';
import activeTodoReducer from './activeTodoReducer';
import collaboratorReducer from './collaboratorReducer';
import userReducer from './userReducer';
import { SIGNOUT_USER_SUCCESS } from '../constants/actionTypes';

const appReducer = combineReducers({
  authReducer,
  todosReducer,
  tasksReducer,
  activeTodoReducer,
  collaboratorReducer,
  userReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT_USER_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
