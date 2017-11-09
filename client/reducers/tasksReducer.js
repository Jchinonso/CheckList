import {
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  RECEIVE_TASKS_FAILURE,
  RECEIVE_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS,
} from '../constants/actionTypes';

const intialState = {
  tasks: [],
  errorMsg: ''
};
export default function tasksReducer(state = intialState, action) {
  switch (action.type) {
  case RECEIVE_TASKS_SUCCESS: {
    return { ...state, tasks: action.tasks };
  }
  case RECEIVE_TASKS_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  case ADD_TASK_SUCCESS: {
    return { ...state, tasks: [action.task, ...state.tasks] };
  }
  case ADD_TASK_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  case UPDATE_TASK_SUCCESS: {
    const { tasks } = state;
    const { completed, taskId } = action;
    const updatedTasks = tasks.map((task) => {
      if (task._id !== taskId) return task;
      return { ...task, completed };
    });
    return { ...state, tasks: updatedTasks };
  }
  default:
    return state;
  }
}
