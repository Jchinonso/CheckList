import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../actions/todosActions';
import * as types from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Todo Action synchronous test', () => {
  describe('action add task to todo', () => {
    it('should create todo successfully', () => {
      const todo = {
        text: 'new todo'
      };
      const expectedAction = {
        type: types.CREATE_TODO_SUCCESS,
        todo
      };
      expect(actions.createTodoSuccess(todo)).toEqual(expectedAction);
    });
    it('should receive todos successfully', () => {
      const todos = [{
        text: 'new todo'
      }];
      const expectedAction = {
        type: types.RECEIVE_TODOS_SUCCESS,
        todos
      };
      expect(actions.receiveTodosSuccess(todos)).toEqual(expectedAction);
    });
    it('should create todo failure action', () => {
      const error = 'internal server error';
      const expectedAction = {
        type: types.CREATE_TODO_FAILURE,
        error
      };
      expect(actions.createTodoFailure(error)).toEqual(expectedAction);
    });
  });
  describe('Todo asynchronous actions', () => {
    describe('action creates todo', () => {
      it('should dispatch creatTodo action', async () => {
        const response = {
          status: 201,
          data: {
            todo: {
              text: 'dinner',
            }
          }
        };
        const expectedAction = {
          type: types.CREATE_TODO_SUCCESS,
          todo: {
            text: 'dinner',
          }
        };
        axios.post = jest.fn(() => {
          return Promise.resolve(response);
        });
        const store = mockStore({ todo: {}, expectedAction });
        await store.dispatch(actions.createTodo()).then(() => {
          const action = store.getActions();
          expect(action[0].type).toEqual(types.CREATE_TODO_SUCCESS);
          expect(action[0]).toEqual(expectedAction);
        });
      });
    });
  });
});
