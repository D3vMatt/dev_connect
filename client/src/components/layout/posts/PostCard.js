import React from 'react';
import PropTypes from 'prop-types';

const PostCard = (props) => {
  const {
    _id,
    text,
    username,
    avatar,
    likes,
    comments,
    user,
    date,
  } = props.post;

  const likePost = () => {
    alert('Liking Post');
  };

  return (
    <div class='post bg-white p-1 my-1' key={_id}>
      <div>
        <a href='profile.html'>
          <img class='round-img' src={avatar} alt='' />
          <h4>{username}</h4>
        </a>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>Posted on {date}</p>
        <button type='button' onClick={likePost} class='btn btn-light'>
          <i class='fas fa-thumbs-up'></i>
          <span>{likes.length}</span>
        </button>
        <button type='button' class='btn btn-light'>
          <i class='fas fa-thumbs-down'></i>
        </button>
        <a href='post.html' class='btn btn-primary'>
          Discussion <span class='comment-count'>{comments.length}</span>
        </a>
        <button type='button' class='btn btn-danger'>
          <i class='fas fa-times'></i>
        </button>
      </div>
    </div>
  );
};

PostCard.propTypes = {};

export default PostCard;
