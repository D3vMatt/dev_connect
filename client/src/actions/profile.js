import axios from 'axios';
import { PROFILE_GET_SUCCESS, PROFILE_GET_ERROR } from './constants';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    let res = await axios.get('/api/profile/me');
    dispatch({
      type: PROFILE_GET_SUCCESS,
      payload: {
        profile: res.data,
      },
    });
  } catch (error) {
    dispatch({
      type: PROFILE_GET_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
