import { PROFILE_GET_ERROR, PROFILE_GET_SUCCESS } from '../actions/constants';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_GET_SUCCESS:
      return {
        ...state,
        profile: { ...payload.profile },
        loading: false,
      };
    case PROFILE_GET_ERROR:
      return {
        ...state,
        loading: false,
        errors: [...payload.errors],
      };
    default:
      return { ...state };
  }
}
