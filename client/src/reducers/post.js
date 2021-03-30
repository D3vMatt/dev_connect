import {
  POSTS_FAIL,
  POSTS_SUCCESS,
  POST_LIKE_SUCCESS,
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
