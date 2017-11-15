import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token) {
    window.localStorage.setItem('tokenize', token);
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
