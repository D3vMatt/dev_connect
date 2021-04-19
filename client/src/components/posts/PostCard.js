import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { likePost, unlikePost, deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

const PostCard = ({ post, likePost, unlikePost, deletePost }) => {
  const { _id, text, username, avatar, likes, comments, user, date } = post;

  const handlePostDelete = (postId) => {
    confirmAlert({
      title: 'Ar you sure you want to delete this post?',
      message: 'This action can not be undone.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deletePost(postId),
        },
        {
          label: 'No',
        },
      ],
    });

    // alert(`Are you sure you want to delete post: ${postId}`);
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
        <button
          onClick={() => likePost(_id)}
          type='button'
          class='btn btn-light'
        >
          <i class='fas fa-thumbs-up'></i>
          <span>{likes.length}</span>
        </button>
        <button
          onClick={() => unlikePost(_id)}
          type='button'
          class='btn btn-light'
        >
          <i class='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} class='btn btn-primary'>
          Discussion <span class='comment-count'>{comments.length}</span>
        </Link>
        <button
          onClick={() => handlePostDelete(_id)}
          type='button'
          class='btn btn-danger'
        >
          <i class='fas fa-times'></i>
        </button>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { likePost, unlikePost, deletePost })(PostCard);
