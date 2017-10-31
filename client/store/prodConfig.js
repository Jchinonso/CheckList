import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers/rootReducer';

const configureStore = () => (
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )(createStore)(rootReducer)
);

export default configureStore;
