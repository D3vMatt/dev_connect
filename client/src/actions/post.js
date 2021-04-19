import axios from 'axios';
import { setAlert } from './alert';
import {
  POSTS_FAIL,
  POSTS_SUCCESS,
  POST_LIKE_SUCCESS,
  POST_CREATE_SUCCESS,
  ALERT_TYPE_DANGER,
  ALERT_TYPE_SUCCESS,
  POST_GET_BY_ID_SUCCESS,
  POST_ADD_COMMENT_SUCCESS,
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
    dispatch({
      type: POSTS_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createPost = (text) => async (dispatch) => {
  try {
    let post = await axios.post('/api/posts', { text });
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: post.data,
    });
    dispatch(setAlert('Post Created Sucessfully!', ALERT_TYPE_SUCCESS));
    dispatch(getPosts());
  } catch (error) {
    dispatch(setAlert('Error Creating Post!', ALERT_TYPE_DANGER));
    dispatch({
      type: POSTS_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    let post = axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: post.data,
    });
    dispatch(getPosts());
    dispatch(setAlert(`Post deleted.`, ALERT_TYPE_DANGER));
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

export const getPostById = (postId) => async (dispatch) => {
  try {
    let post = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: POST_GET_BY_ID_SUCCESS,
      payload: post.data,
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

export const addPostComment = (text, postId) => async (dispatch) => {
  try {
    let postComment = await axios.put(`/api/posts/comment/add/${postId}`, {
      text,
    });
    dispatch({
      type: POST_ADD_COMMENT_SUCCESS,
      payload: postComment.response,
    });
    dispatch(getPostById(postId));
    dispatch(setAlert('Comment added!', ALERT_TYPE_SUCCESS));
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
