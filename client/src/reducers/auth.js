import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_AUTHENTICATION_FAIL,
  USER_AUTHENTICATION_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: { ...payload },
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      // save token in local stoarge
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case USER_AUTHENTICATION_FAIL:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT:  
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
