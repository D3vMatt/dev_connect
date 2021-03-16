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
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_EXPERIENCE_ADD_FAIL,
  PROFILE_EXPERIENCE_ADD_SUCCESS,
  PROFILE_EDUCATION_ADD_FAIL,
  PROFILE_EDUCATION_ADD_SUCCESS,
  ALERT_TYPE_SUCCESS,
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
    dispatch(logout());
    dispatch({ type: PROFILE_ACCOUNT_DELETE_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ACCOUNT_DELETE_ERROR,
      // payload: {
      //   msg: error.response.statusText,
      //   status: error.response.status,
      // },
    });
    dispatch(setAlert('A error has occured.', ALERT_TYPE_DANGER));
  }
};

export const createOrUpdateCurrentProfile = (profile_data) => async (
  dispatch
) => {
  try {
    const response = await axios.post('/api/profile', profile_data);
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: { profile: response.data },
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
    if (errors) {
      errors.forEach((error) => {
        console.log(error);
        dispatch(setAlert(error.msg, ALERT_TYPE_DANGER));
      });
    }
  }
};

export const addProfileExperience = (exp_data) => async (dispatch) => {
  try {
    let result = await axios.put('/api/profile/experience', exp_data);
    dispatch({
      type: PROFILE_EXPERIENCE_ADD_SUCCESS,
      payload: { profile: result.data },
    });
    dispatch(setAlert('Experience sucessfully added!', ALERT_TYPE_SUCCESS));
  } catch (error) {
    dispatch({
      type: PROFILE_EXPERIENCE_ADD_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    let errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        console.log(error);
        dispatch(setAlert(error.msg, ALERT_TYPE_DANGER));
      });
    }
  }
};

export const addProfileEducation = (education_data) => async (dispatch) => {
  try {
    let response = await axios.put('/api/profile/education', education_data);
    dispatch({
      type: PROFILE_EDUCATION_ADD_SUCCESS,
      payload: { profile: response.data },
    });
    dispatch(setAlert('Education sucessfully added!', ALERT_TYPE_SUCCESS));
  } catch (error) {
    dispatch({
      type: PROFILE_EDUCATION_ADD_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    let errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        console.log(error);
        dispatch(setAlert(error.msg, ALERT_TYPE_DANGER));
      });
    }
  }
};
