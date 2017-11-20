import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../actions/tasksActions';
import * as types from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Task synchronous ', () => {
  describe('addTaskSuccess and addTaskFailure actions', () => {
    it('should add task to todo', () => {
      const task = {
        text: 'new task'
      };
      const expectedAction = {
        type: types.ADD_TASK_SUCCESS,
        task
      };
      expect(actions
        .addTaskSuccess(task))
        .toEqual(expectedAction);
    });
    it('should not add task to todo', () => {
      const error = 'text required';
      const expectedAction = {
        type: types.ADD_TASK_FAILURE,
        error
      };
      expect(actions
        .addTaskFailure(error))
        .toEqual(expectedAction);
    });
  });
  describe('updateTaskSuccess action', () => {
    it('should update a sigle task', () => {
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
      expect(actions
        .updateTaskSuccess(taskId, userObject))
        .toEqual(expectedAction);
    });
  });
  describe('updateTaskStatusSuccess', () => {
    it('should update task completed status in todo', () => {
      const taskId = '132343242342';
      const completed = true;
      const expectedAction = {
        type: types.UPDATE_TASK_STATUS,
        taskId,
        completed
      };
      expect(actions
        .updateTaskStatusSuccess(taskId, completed))
        .toEqual(expectedAction);
    });
  });
  describe('deleteTaskSuccess action', () => {
    it('should delete task from a todo', () => {
      const taskId = '132343242342';
      const expectedAction = {
        type: types.DELETE_TASK_SUCCESS,
        taskId
      };
      expect(actions
        .deleteTaskSuccess(taskId))
        .toEqual(expectedAction);
    });
  });
  describe('receiveTasksSuccess action', () => {
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
      expect(actions
        .receiveTasksSuccess(tasks))
        .toEqual(expectedAction);
    });
  });
  describe('receiveTasksFailure action', () => {
    it('should not recieve tasks when error occurs', () => {
      const error = 'Internal server error';
      const expectedAction = {
        type: types.RECEIVE_TASKS_FAILURE,
        error
      };
      expect(actions
        .receiveTasksFailure(error))
        .toEqual(expectedAction);
    });
  });
});
describe('Task asynchronous actions', () => {
  describe('createTask action', () => {
    it('should make a post request to create a new task ', async () => {
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
    describe('fetchTasks action', () => {
      it('should make a get request to fetch all tasks that belong to Todo ',
        async () => {
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
  });
  describe('updateTask action', () => {
    it('should make a put request to update task that belong to todo ',
      async () => {
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
      }
    );
  });
  describe('updateTaskStatus action', () => {
    it('should make a put resquest to update' +
    'task completed status that belong to todo ',
    async () => {
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
    }
    );
  });
  describe('deleteTask action', () => {
    it('should make a delete request to delete task from todo ', async () => {
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
});
