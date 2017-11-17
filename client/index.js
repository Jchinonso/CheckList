import React from 'react';
import { render } from 'react-dom';
import jwtDecode from 'jwt-decode';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import 'jquery/dist/jquery';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize';
import 'toastr/build/toastr.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { setCurrentUser } from './actions/authActions';
import store from './store';
import setAuthorizationToken from './utils/setAuthorizationToken';
import App from './Component/App.jsx';
import routes from './routes';
import './assets/css/todo.css';

const token = window.localStorage.getItem('tokenize');
if (token) {
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwtDecode(token)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
, document.getElementById('app')
);

