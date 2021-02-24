import { uuid } from 'uuidv4';
import { REMOVE_ALERT, SET_ALERT } from '../actions/constants';

export const setAlert = (msg, alertType, timeOut = 5000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, alertType },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: { id } });
  }, timeOut);
};
