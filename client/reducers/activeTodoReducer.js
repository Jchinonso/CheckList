import {
  SELECT_TODO
} from '../constants/actionTypes';

const initialState = {
  todoId: ''
};

export default function activeTodoReducer(state = initialState, action) {
  switch (action.type) {
  case SELECT_TODO: {
    return { ...state, todoId: action.todoId };
  }
  default:
    return state;
  }
}
