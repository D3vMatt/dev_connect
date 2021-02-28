import axios from 'axios';
import {
  ALERT_TYPE_DANGER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './constants';
import { setAlert } from './alert';

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    const payload = { name, password, email };
    const response = await axios.post('/api/users', payload);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
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
