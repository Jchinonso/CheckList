import {
  FETCH_USER_SUCCESS,
} from '../constants/actionTypes';

const intialState = {
  successMsg: '',
  errorMsg: '',
  users: [],
};
export default function addMembersReducer(state = intialState, action) {
  switch (action.type) {
  case FETCH_USER_SUCCESS: {
    return { ...state, users: action.users };
  }
  default:
    return state;
  }
}
