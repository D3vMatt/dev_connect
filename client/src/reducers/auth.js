import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/constants';

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
