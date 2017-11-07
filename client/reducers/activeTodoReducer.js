import {
  SELECT_TODO
} from '../constants/actionTypes';

export default function activeTodoReducer(state = '', action) {
  switch (action.type) {
  case SELECT_TODO: {
    return action.todoId;
  }
  default:
    return state;
  }
}
