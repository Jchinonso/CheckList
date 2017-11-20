import React from 'react';
import { render } from 'react-dom';
import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
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


const secret = 'keepmysecret';
const token = window.localStorage.getItem('tokenize');
if (token) {
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      window.localStorage.removeItem('tokenize');
      toastr.error('Your current session has expired please kindly sign in');
    } else {
      setAuthorizationToken(token);
      store.dispatch(setCurrentUser(jwtDecode(token)));
    }
  });
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
, document.getElementById('app')
);

