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
export default function collaboratorReducer(state = intialState, action) {
  switch (action.type) {
  case ADD_COLLABORATOR_SUCCESS: {
    return { ...state, successMsg: action.message };
  }
  case ADD_COLLABORATOR_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  case FETCH_COLLABORATOR_SUCCESS: {
    return { ...state, collaborators: action.collaborators };
  }
  default:
    return state;
  }
}
