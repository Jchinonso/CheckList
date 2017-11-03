import {
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  RECEIVE_TASKS_FAILURE,
  RECEIVE_TASKS_SUCCESS,
} from '../constants/actionTypes';

const intialState = {
  tasks: [],
  errorMsg: '',
};
export default function groupReducer(state = intialState, action) {
  switch (action.type) {
  case ADD_TASK_SUCCESS: {
    return { ...state, tasks: action.task };
  }
  case ADD_TASK_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  case RECEIVE_TASKS_SUCCESS: {
    return { ...state, tasks: [...state.tasks, action.tasks] };
  }
  case RECEIVE_TASKS_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  default:
    return state;
  }
}
