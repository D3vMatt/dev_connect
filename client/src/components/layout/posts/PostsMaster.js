import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../../actions/post';
import PostCard from './PostCard';

const PostsMaster = ({ posts, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1 class='large text-primary'>Posts</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Welcome to the community!
      </p>

      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form class='form my-1'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            required
          ></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>

      <div class='posts'>
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

PostsMaster.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getPosts })(PostsMaster);
