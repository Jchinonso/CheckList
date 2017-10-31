import {
  SET_CURRENT_USER,
  LOG_ERROR,
  SIGNOUT_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  errorMsg: ''
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: true,
      user: action.user
    };
  case SIGNOUT_SUCCESS:
    return {
      ...state,
      isAuthenticated: false
    };
  case LOG_ERROR:
    return {
      ...state,
      isAuthenticated: false,
      errorMsg: action.error
    };
  default:
    return state;
  }
}
