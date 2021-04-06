import {
  POSTS_FAIL,
  POSTS_SUCCESS,
  POST_CREATE_SUCCESS,
  POST_LIKE_SUCCESS,
  POST_GET_BY_ID_SUCCESS,
} from '../actions/constants';

const initialState = {
  loading: true,
  errors: false,
  posts: [],
  post: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_GET_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        post: { ...payload },
      };
    case POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...payload],
      };
      break;
    case POST_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        post: { ...payload },
      };
    case POSTS_FAIL:
      return {
        ...state,
        loading: false,
        errors: { ...payload },
      };
    default:
      return { ...state };
  }
}
