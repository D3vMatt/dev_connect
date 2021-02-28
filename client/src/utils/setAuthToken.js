import axios from 'axios';

export const setAuthTokenAsGlobalHeader = () => {
  let token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    axios.defaults.headers.common = {
      'x-auth-token': token,
    };
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
