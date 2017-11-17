import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../actions/tasksActions';
import * as types from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Task Action synchronous test', () => {
  describe('action add task to todo', () => {
    it('should add task to todo', () => {
      const task = {
        text: 'new task'
      };
      const expectedAction = {
        type: types.ADD_TASK_SUCCESS,
        task
      };
      expect(actions.addTaskSuccess(task)).toEqual(expectedAction);
    });
    it('should not add task to todo', () => {
      const error = 'text required';
      const expectedAction = {
        type: types.ADD_TASK_FAILURE,
        error
      };
      expect(actions.addTaskFailure(error)).toEqual(expectedAction);
    });
    it('should update task in todo', () => {
      const taskId = '132343242342';
      const userObject = {
        text: 'See a movie',
        priority: 'normal'
      };
      const expectedAction = {
        type: types.UPDATE_TASK_SUCCESS,
        taskId,
        userObject
      };
      expect(actions.updateTaskSuccess(taskId, userObject)).toEqual(expectedAction);
    });
    it('should update task status in todo', () => {
      const taskId = '132343242342';
      const completed = true;
      const expectedAction = {
        type: types.UPDATE_TASK_STATUS,
        taskId,
        completed
      };
      expect(actions.updateTaskStatusSuccess(taskId, completed)).toEqual(expectedAction);
    });
    it('should delete task from a todo', () => {
      const taskId = '132343242342';
      const expectedAction = {
        type: types.DELETE_TASK_SUCCESS,
        taskId
      };
      expect(actions.deleteTaskSuccess(taskId)).toEqual(expectedAction);
    });
    it('should recieve tasks that belongs to todo', () => {
      const tasks = [
        {
          text: 'dinner',
          completed: false,
          priority: 'normal'
        }
      ];
      const expectedAction = {
        type: types.RECEIVE_TASKS_SUCCESS,
        tasks
      };
      expect(actions.receiveTasksSuccess(tasks)).toEqual(expectedAction);
    });
    it('should not recieve tasks when error happens', () => {
      const error = 'Internal server error';
      const expectedAction = {
        type: types.RECEIVE_TASKS_FAILURE,
        error
      };
      expect(actions.receiveTasksFailure(error)).toEqual(expectedAction);
    });
  });
});
describe('Task asynchronous actions', () => {
  describe('action creates task', () => {
    it('should make a post request to create task ', async () => {
      const response = {
        status: 201,
        data: {
          task: {
            text: 'dinner',
            priority: 'normal'
          }
        }
      };
      const expectedAction = {
        type: types.ADD_TASK_SUCCESS,
        task: {
          text: 'dinner',
          priority: 'normal'
        }
      };
      axios.post = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ task: {}, expectedAction });
      await store.dispatch(actions.createTask()).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.ADD_TASK_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
    it('should fetch all tasks that belong to Todo ', async () => {
      const todoId = '2434234234';
      const response = {
        status: 200,
        data: {
          tasks: [
            {
              text: 'Go to the cinema',
              priority: 'normal'
            }
          ]
        }
      };
      const expectedAction = {
        type: types.RECEIVE_TASKS_SUCCESS,
        tasks: [
          {
            text: 'Go to the cinema',
            priority: 'normal'
          }
        ]
      };
      axios.get = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ tasks: [], expectedAction });
      await store.dispatch(actions.fetchTasks(todoId)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.RECEIVE_TASKS_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  it('should update task that belong to todo ', async () => {
    const todoId = '238973274328479';
    const taskId = 'urqworuweoruweur89832';
    const task = {
      _id: '297342934723474',
      text: 'Go for lunch'
    };
    const response = {
      status: 200,
      data: {
        editedTask: {
          text: 'Go for lunch',
          priority: 'normal',
          completed: false
        }
      }
    };
    const expectedAction = {
      type: types.UPDATE_TASK_SUCCESS,
      userObject: {
        text: 'Go for lunch',
        priority: 'normal',
        completed: false
      },
      taskId: '297342934723474'
    };
    axios.put = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ task: {}, expectedAction });
    await store.dispatch(actions.updateTask(todoId, task)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.UPDATE_TASK_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
  it('should update task status that belong to todo ', async () => {
    const todoId = '238973274328479';
    const taskId = 'urqworuweoruweur89832';
    const task = {
      _id: '297342934723474',
      text: 'Go for lunch'
    };
    const response = {
      status: 200,
      data: {
        editedTask: {
          text: 'Go for lunch',
          priority: 'normal',
          completed: false
        }
      }
    };
    const expectedAction = {
      type: types.UPDATE_TASK_STATUS,
      taskId: '297342934723474',
      completed: true
    };
    axios.put = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ task: {}, expectedAction });
    await store.dispatch(actions.updateTaskStatus(taskId, task)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.UPDATE_TASK_STATUS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
  it('should delete task from todo ', async () => {
    const todoId = '238973274328479';
    const taskId = '297342934723474';
    const expectedAction = {
      type: types.DELETE_TASK_SUCCESS,
      taskId: '297342934723474',
    };
    axios.delete = jest.fn(() => {
      return Promise.resolve();
    });
    const store = mockStore({ task: {}, expectedAction });
    await store.dispatch(actions.deleteTask(todoId, taskId)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.DELETE_TASK_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
