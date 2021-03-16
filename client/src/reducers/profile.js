import {
  PROFILE_EXPERIENCE_DELETE_ERROR,
  PROFILE_EXPERIENCE_DELETE_SUCCESS,
  PROFILE_GET_ERROR,
  PROFILE_GET_SUCCESS,
  PROFILE_EDUCATION_DELETE_ERROR,
  PROFILE_EDUCATION_DELETE_SUCCESS,
  PROFILE_ACCOUNT_DELETE_SUCCESS,
  PROFILE_ACCOUNT_DELETE_ERROR,
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_EXPERIENCE_ADD_FAIL,
  PROFILE_EXPERIENCE_ADD_SUCCESS,
  PROFILE_EDUCATION_ADD_FAIL,
  PROFILE_EDUCATION_ADD_SUCCESS,
} from '../actions/constants';

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
    case PROFILE_EXPERIENCE_DELETE_SUCCESS:
    case PROFILE_EDUCATION_DELETE_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
    case PROFILE_EXPERIENCE_ADD_SUCCESS:
    case PROFILE_EDUCATION_ADD_SUCCESS:
      return {
        ...state,
        profile: { ...payload.profile },
        loading: false,
      };

    case PROFILE_ACCOUNT_DELETE_SUCCESS:
      return null;
    case PROFILE_GET_ERROR:
    case PROFILE_EXPERIENCE_DELETE_ERROR:
    case PROFILE_EDUCATION_DELETE_ERROR:
    case PROFILE_ACCOUNT_DELETE_ERROR:
    case PROFILE_CREATE_FAIL:
    case PROFILE_UPDATE_FAIL:
    case PROFILE_EXPERIENCE_ADD_FAIL:
    case PROFILE_EDUCATION_ADD_FAIL:
      console.log(payload);
      return {
        ...state,
        loading: false,
        // errors: [...payload.errors],
      };
    default:
      return { ...state };
  }
}
