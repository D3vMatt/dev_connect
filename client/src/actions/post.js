import axios from 'axios';
import { POSTS_FAIL, POSTS_SUCCESS } from './constants';

export const getPosts = () => async (dispatch) => {
  try {
    let posts = await axios.get('/api/posts');
    dispatch({
      type: POSTS_SUCCESS,
      payload: posts.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
