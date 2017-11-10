import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Component/App.jsx';
import AuthenticationPage from './Component/AuthComponent/Index.jsx';
import ForgotPassword from './Component/AuthComponent/ForgotPassword.jsx';
import ResetPassword from './Component/AuthComponent/ResetPassword.jsx';
import DashBoard from './Component/DashBoard/Dashboard.jsx';

const onEnter = (next, replace, cb) => {
  if (localStorage.getItem('tokenize') !== null && next.location.pathname === '/') {
    replace('/dashboard');
  }
  if (localStorage.getItem('tokenize') === null && (next.location.pathname === ('/dashboard'))) {
    replace('/');
  }
  cb();
};

export default(
  <Route path="/" component={App} onEnter={onEnter} >
    <IndexRoute component={AuthenticationPage} />
    <Route path="/dashboard" component={DashBoard} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/forgot-password" component={ForgotPassword} />
  </Route>
);
