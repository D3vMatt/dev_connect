import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_AUTHENTICATION_FAIL,
  USER_AUTHENTICATION_SUCCESS,
} from '../actions/constants';

const initialState = [
  {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
  },
];

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
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
