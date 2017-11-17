import expect from 'expect';
import collaboratorReducer from '../../reducers/collaboratorReducer';
import * as actions from '../../actions/collaboratorsAction';

describe('collaborator reducer', () => {
  const initialState = {
    successMsg: '',
    errorMsg: '',
    collaborators: [],
  };
  it('should add collaborator when passed ADD_COLLABORATOR_SUCCESS', () => {
    const successMsg = 'collaborator successfully added';
    const action = actions.addCollaboratorSuccess(successMsg);
    const newState = collaboratorReducer(initialState, action);
    expect(newState.successMsg).toEqual('collaborator successfully added');
  });
  it('should add collaborator error message when passed ADD_COLLABORATOR_FAILURE', () => {
    const errorMsg = 'user already exist';
    const action = actions.addCollaboratorFailure(errorMsg);
    const newState = collaboratorReducer(initialState, action);
    expect(newState.errorMsg).toEqual('user already exist');
  });
  it('should add fetch collaborator success message when passed FETCH_COLLABORATOR_SUCCESS', () => {
    const collaborators = ['samuel', 'john'];
    const action = actions.fetchCollaboratorSuccess(collaborators);
    const newState = collaboratorReducer(initialState, action);
    expect(newState.collaborators).toEqual(['samuel', 'john']);
  });
});
