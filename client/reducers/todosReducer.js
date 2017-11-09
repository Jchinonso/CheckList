import {
  CREATE_TODO_FAILURE,
  CREATE_TODO_SUCCESS,
  RECEIVE_TODOS_SUCCESS,
  RECEIVE_TODOS_FAILURE
} from '../constants/actionTypes';

const intialState = {
  todos: [],
  errorMsg: '',
};
export default function todosReducer(state = intialState, action) {
  switch (action.type) {
  case RECEIVE_TODOS_SUCCESS: {
    return { ...state, todos: action.todos };
  }
  case RECEIVE_TODOS_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  case CREATE_TODO_SUCCESS: {
    return { ...state, todos: [...state.todos, action.todo] };
  }
  case CREATE_TODO_FAILURE: {
    return { ...state, errorMsg: action.error };
  }
  default:
    return state;
  }
}
