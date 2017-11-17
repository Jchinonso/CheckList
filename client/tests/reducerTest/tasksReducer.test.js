import expect from 'expect';

import tasksReducer from '../../reducers/tasksReducer';
import * as actions from '../../actions/tasksActions';


describe('task Reducer', () => {
  const task = {
    text: 'new task'
  };
  const initialState = {
    tasks: [],
    errorMsg: ''
  };
  it('should create task when ADD_TASK_SUCCESS is passed', () => {
    const action = actions.addTaskSuccess(task);
    const newState = tasksReducer(initialState, action);
    expect(newState.tasks).toEqual([{
      text: 'new task'
    }]);
  });
  it('should send error message when ADD_TASK_FAILURE is passed', () => {
    const errorMsg = 'text is required';
    const action = actions.addTaskFailure(errorMsg);
    const newState = tasksReducer(initialState, action);
    expect(newState.errorMsg).toEqual('text is required');
  });
  it('should update task when UPDATE_TASK_SUCCESS is passed', () => {
    const newTask = {
      id: 'weyriwyeriw899899',
      text: 'eat lunch'
    };
    const newInitialState = {
      tasks: [{
        id: 'weyriwyeriw899899',
        text: 'go to the cinemas'
      }]
    };
    const action = actions.updateTaskSuccess(newTask.id, newTask);
    const newState = tasksReducer(newInitialState, action);
    expect(newState.tasks[0]).toEqual({
      id: 'weyriwyeriw899899',
      text: 'go to the cinemas'
    });
  });
  it('should update task status when UPDATE_TASK_STATUS is passed', () => {
    const completed = true;
    const taskId = 'jjjdfksjd8937987283';
    const newInitialState = {
      tasks: [{
        id: 'weyriwyeriw899899',
        text: 'go to the cinemas',
        completed: true
      }]
    };
    const action = actions.updateTaskStatus(taskId, completed);
    const newState = tasksReducer(newInitialState, action);
    expect(newState.tasks[0]).toEqual({
      id: 'weyriwyeriw899899',
      text: 'go to the cinemas',
      completed: true
    });
  });
});
