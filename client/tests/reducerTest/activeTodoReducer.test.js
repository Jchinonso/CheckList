import expect from 'expect';
import activeTodoReducer from '../../reducers/activeTodoReducer';
import * as actions from '../../actions/todosActions';


describe('active Todo Reducer', () => {
  it('should get the current todo id when passed SELECT_TODO', () => {
    const initialState = {
      todoId: ''
    };
    const todoId = 'eowrueioruwier892378927';
    const action = actions.selectTodo(todoId);
    const newState = activeTodoReducer(initialState, action);
    expect(newState).toEqual({ todoId: 'eowrueioruwier892378927' });
  });
});
