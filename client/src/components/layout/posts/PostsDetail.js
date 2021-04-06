import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPostById, addPostComment } from '../../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PostsDetail = ({ match, getPostById, post, addPostComment }) => {
  const { postId } = match.params;
  const [fromData, setFormData] = useState({ text: '' });
  const history = useHistory();

  const handleSumbit = (e) => {
    e.preventDefault();
    addPostComment(fromData.text, postId);
    setFormData({ text: '' });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getPostById(postId);
  }, []);

  return (
    <div>
      <a onClick={history.goBack} class='btn'>
        Back To Posts
      </a>
      <div class='post bg-white p-1 my-1'>
        <div>
          <a href='profile.html'>
            <img class='round-img' src={post && post.avatar} alt='' />
            <h4>{post && post.username}</h4>
          </a>
        </div>
        <div>
          <p class='my-1'>{post && post.text}</p>
        </div>
      </div>

      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Leave A Comment</h3>
        </div>
        <form class='form my-1' onSubmit={handleSumbit}>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment on this post'
            required
            value={fromData.text}
            onChange={handleChange}
          ></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>

      <div class='comments'>
        {post &&
          post.comments &&
          post.comments.map((comment) => (
            <div class='post bg-white p-1 my-1' key={comment._id}>
              <div>
                <a href='profile.html'>
                  <img class='round-img' src={comment.avatar} alt='' />
                  <h4>{comment.name}</h4>
                </a>
              </div>
              <div>
                <p class='my-1'>{comment.text}</p>
                <p class='post-date'>Posted on {comment.date}</p>
                <button type='button' class='btn btn-danger'>
                  <i class='fas fa-times'></i>
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
