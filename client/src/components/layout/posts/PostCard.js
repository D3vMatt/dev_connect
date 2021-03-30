import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from '../../../actions/post';
import { connect } from 'react-redux';

const PostCard = ({ post, likePost, unlikePost }) => {
  const { _id, text, username, avatar, likes, comments, user, date } = post;

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
        <button
          onClick={() => likePost(_id)}
          type='button'
          class='btn btn-light'
        >
          <i class='fas fa-thumbs-up'></i>
          <span>{likes.length}</span>
        </button>
        <button
          data-id={_id}
          onClick={() => unlikePost(_id)}
          type='button'
          class='btn btn-light'
        >
          <i class='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} class='btn btn-primary'>
          Discussion <span class='comment-count'>{comments.length}</span>
        </Link>
        <button type='button' class='btn btn-danger'>
          <i class='fas fa-times'></i>
        </button>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

export default connect(null, { likePost, unlikePost })(PostCard);
