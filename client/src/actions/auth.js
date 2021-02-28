import axios from 'axios';
import {
  ALERT_TYPE_DANGER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_AUTHENTICATION_SUCCESS,
  USER_AUTHENTICATION_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from './constants';
import { setAlert } from './alert';
import { setAuthTokenAsGlobalHeader } from '../utils/setAuthToken';

export const authenticateUser = () => async (dispatch) => {
  setAuthTokenAsGlobalHeader();
  try {
    const user = await axios.get('api/auth');
    dispatch({
      type: USER_AUTHENTICATION_SUCCESS,
      payload: user.data,
    });
    console.log(user);
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_AUTHENTICATION_FAIL,
    });
  }
};

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    const payload = { name, password, email };
    const response = await axios.post('/api/users', payload);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    dispatch(authenticateUser());
  } catch (error) {
    let errors = error.response.data.errors.errors;
    if (errors) {
      errors.forEach((error) => {
        console.log(error);
        dispatch(setAlert(error.msg, ALERT_TYPE_DANGER));
      });
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('api/auth', { email, password });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(authenticateUser());
  } catch (error) {
    console.log(error.response);
    dispatch({ type: USER_LOGIN_FAIL });
  }
};
