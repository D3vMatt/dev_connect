import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../../actions/post';
import PostCard from './PostCard';
import PostForm from './PostForm';

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
      <PostForm />
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
