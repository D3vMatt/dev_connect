import axios from 'axios';
import {
  POSTS_FAIL,
  POSTS_SUCCESS,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
} from './constants';

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

export const likePost = (postId) => async (dispatch) => {
  try {
    let like_post = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: POST_LIKE_SUCCESS,
      payload: like_post.data,
    });
    dispatch(getPosts());
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

export const unlikePost = (postId) => async (dispatch) => {
  try {
    let unlike_post = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: POST_LIKE_SUCCESS,
      payload: unlike_post.data,
    });
    dispatch(getPosts());
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: POSTS_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
