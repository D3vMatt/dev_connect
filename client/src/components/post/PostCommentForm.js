import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addPostComment } from '../../actions/post';
import { connect } from 'react-redux';

const PostCommentForm = ({ addPostComment, postId }) => {
  const [fromData, setFormData] = useState({ text: '' });

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

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form className='form my-1' onSubmit={handleSumbit}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          required
          value={fromData.text}
          onChange={handleChange}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostCommentForm.propTypes = {
  addPostComment: PropTypes.func.isRequired,
};

export default connect(null, { addPostComment })(PostCommentForm);
