import expect from 'expect';

import todosReducer from '../../reducers/todosReducer';
import * as actions from '../../actions/todosActions';

describe('todo reducer', () => {
  const initialState = {
    todos: [],
    errorMsg: '',
  };
  it('should create new todo when CREATE_TODO_SUCCESS is passed', () => {
    const todo = {
      text: 'newTodo'
    };
    const action = actions.createTodoSuccess(todo);
    const newState = todosReducer(initialState, action);
    expect(newState.todos[0]).toEqual({
      text: 'newTodo'
    });
  });
  it('should receive todos when RECEIVE_TODOS_SUCCESS is passed', () => {
    const todos = [{
      text: 'newTodo'
    }];
    const action = actions.receiveTodosSuccess(todos);
    const newState = todosReducer(initialState, action);
    expect(newState.todos).toEqual([{
      text: 'newTodo'
    }]);
  });
  it('should update error messgae when CREATE_TODO_FAILURE is passed', () => {
    const error = 'text is required';
    const action = actions.createTodoFailure(error);
    const newState = todosReducer(initialState, action);
    expect(newState.errorMsg).toEqual('text is required');
  });
  it('should update error messgae when RECEIVE_TODOS_FAILURE is passed', () => {
    const error = 'internal server error';
    const action = actions.receiveTodosFailure(error);
    const newState = todosReducer(initialState, action);
    expect(newState.errorMsg).toEqual('internal server error');
  });
});
