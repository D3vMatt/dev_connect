import axios from 'axios';
import {
  PROFILE_GET_SUCCESS,
  PROFILE_GET_ERROR,
  ALERT_TYPE_DANGER,
  PROFILE_EXPERIENCE_DELETE_SUCCESS,
  PROFILE_EXPERIENCE_DELETE_ERROR,
  PROFILE_EDUCATION_DELETE_ERROR,
  PROFILE_EDUCATION_DELETE_SUCCESS,
  PROFILE_ACCOUNT_DELETE_SUCCESS,
  PROFILE_ACCOUNT_DELETE_ERROR,
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
} from './constants';
import { setAlert } from './alert';
import { logout } from './auth';

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

export const deleteProfileExperience = (experience_id) => async (dispatch) => {
  try {
    let profile = await axios.delete(
      `/api/profile/experience/${experience_id}`
    );
    dispatch({
      type: PROFILE_EXPERIENCE_DELETE_SUCCESS,
      payload: {
        profile: profile.data,
      },
    });
    dispatch(setAlert('Experience deleted.', ALERT_TYPE_DANGER));
  } catch (error) {
    dispatch({
      type: PROFILE_EXPERIENCE_DELETE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    dispatch(setAlert('A error has occured.', ALERT_TYPE_DANGER));
  }
};

export const deleteProfileEducation = (education_id) => async (dispatch) => {
  try {
    let profile = await axios.delete(`/api/profile/education/${education_id}`);
    dispatch({
      type: PROFILE_EDUCATION_DELETE_SUCCESS,
      payload: {
        profile: profile.data,
      },
    });
    dispatch(setAlert('Education deleted.', ALERT_TYPE_DANGER));
  } catch (error) {
    dispatch({
      type: PROFILE_EDUCATION_DELETE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    dispatch(setAlert('A error has occured.', ALERT_TYPE_DANGER));
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete('/api/profile');
    dispatch({ type: PROFILE_ACCOUNT_DELETE_SUCCESS });
    dispatch(logout());
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ACCOUNT_DELETE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    dispatch(setAlert('A error has occured.', ALERT_TYPE_DANGER));
  }
};

export const updateCurrentProfile = (profile_data) => async (dispatch) => {
  try {
    const response = await axios.post('/api/profile', profile_data);
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    let errors = error.response.data.errors.errors;
    // if (errors) {
    //   errors.forEach((error) => {
    //     console.log(error);
    //     dispatch(setAlert(error.msg, ALERT_TYPE_DANGER));
    //   });
    // }
    // dispatch({ type: PROFILE_UPDATE_FAIL });
  }
};
