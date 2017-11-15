import {
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  UPDATE_CURRENT_USER_PICTURE,
  SIGNOUT_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: { },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: true,
      user: action.user
    };
  case UPDATE_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: true,
      user: action.user
    };
  case UPDATE_CURRENT_USER_PICTURE:
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
  default:
    return state;
  }
}
