import {
  ADD_COLLABORATOR_SUCCESS,
  ADD_COLLABORATOR_FAILURE,
  FETCH_COLLABORATOR_SUCCESS,
} from '../constants/actionTypes';

const intialState = {
  successMsg: '',
  errorMsg: '',
  collborators: [],
};
export default function addMembersReducer(state = intialState, action) {
  switch (action.type) {
  case ADD_COLLABORATOR_SUCCESS: {
    return { ...state, successMsg: action.message };
  }
  case ADD_COLLABORATOR_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  case FETCH_COLLABORATOR_SUCCESS: {
    return { ...state, users: action.users };
  }
  default:
    return state;
  }
}
