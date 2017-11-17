import {
  FETCH_USERS_SUCCESS,
} from '../constants/actionTypes';

const intialState = {
  users: [],
};
export default function userReducer(state = intialState, action) {
  switch (action.type) {
  case FETCH_USERS_SUCCESS: {
    return { ...state, users: action.users };
  }
  default:
    return state;
  }
}
