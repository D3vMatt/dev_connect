import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPostById, addPostComment } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostCommentForm from './PostCommentForm';

const PostsDetail = ({ match, getPostById, post, addPostComment }) => {
  const { postId } = match.params;
  const history = useHistory();

  useEffect(() => {
    getPostById(postId);
  }, []);

  return (
    <div>
      <a onClick={history.goBack} className='btn'>
        Back To Posts
      </a>
      <div className='post bg-white p-1 my-1'>
        <div>
          <a href='profile.html'>
            <img className='round-img' src={post && post.avatar} alt='' />
            <h4>{post && post.username}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{post && post.text}</p>
        </div>
      </div>

      <PostCommentForm postId={postId} />

      <div className='comments'>
        {post &&
          post.comments &&
          post.comments.map((comment) => (
            <div className='post bg-white p-1 my-1' key={comment._id}>
              <div>
                <a href='profile.html'>
                  <img className='round-img' src={comment.avatar} alt='' />
                  <h4>{comment.name}</h4>
                </a>
              </div>
              <div>
                <p className='my-1'>{comment.text}</p>
                <p className='post-date'>Posted on {comment.date}</p>
                <button type='button' className='btn btn-danger'>
                  <i className='fas fa-times'></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

PostsDetail.propTypes = {
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
  addPostComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post.post,
});

export default connect(mapStateToProps, { getPostById, addPostComment })(
  PostsDetail
);
