const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');
const mongoose = require('mongoose');

// ADD POST ROUTE

// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postObject = ({ text, comments } = req.body);

      const user = await User.findById(res.user.id);
      postObject.user = user.id;
      postObject.username = user.name;
      postObject.avatar = user.avatar;

      var new_post = new Post(postObject);

      // Save the new model instance, passing a callback
      await new_post.save();

      return res.json(postObject);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    posts = await Post.find().sort('-date');
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  let post_id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).send('Post not found');
  }

  try {
    post = await Post.findById(post_id);
    if (post.isEmpty) {
      return res.status(400).send('Post not found');
    }
    return res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route DELETE api/posts/:id
// @desc Delete post by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  let post_id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).send('Post not found');
  }

  try {
    post = await Post.findById(post_id);
    if (!post) {
      return res.status(400).send('Post not found');
    }

    if (post.user != res.user.id) {
      if (post.isEmpty) {
        return res
          .status(400)
          .send('You do not have permission to delete this post.');
      }
    }

    post = await Post.findByIdAndRemove(post_id);
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/posts/like/:id
// @desc Like post by id
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  let post_id = req.params.id;
  let user_id = res.user.id;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).send('Post not found');
  }

  try {
    post = await Post.findById(post_id);
    if (!post) {
      return res.status(400).send('Post not found');
    }

    // check if post has already been liked by user
    if (
      post.likes.filter((like) => like.user.toString() === user_id).length > 0
    ) {
      return res.status(400).json({ msg: 'You have already liked this post' });
    }

    post.likes.unshift({ user: user_id });

    post = await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/posts/unlike/:id
// @desc Unlike post by id
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  let post_id = req.params.id;
  let user_id = res.user.id;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).send('Post not found');
  }

  try {
    post = await Post.findById(post_id);
    if (!post) {
      return res.status(400).send('Post not found');
    }

    // check if post has already been liked by user
    if (
      post.likes.filter((like) => like.user.toString() === user_id).length == 0
    ) {
      return res.status(400).json({ msg: 'You have not liked this post yet.' });
    }

    post = await Post.findByIdAndUpdate(
      post_id,
      { $pull: { likes: { user: user_id } } },
      { new: true }
    );

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/posts/comment/add/:id
// @desc Add comment to post by id
// @access Private
router.put(
  '/comment/add/:id',
  [auth, [check('text', 'Comment text can not be blank').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      return res.json(errors);
    }

    let post_id = req.params.id;
    let user_id = res.user.id;

    if (!mongoose.Types.ObjectId.isValid(post_id)) {
      return res.status(400).send('Post not found');
    }

    try {
      post = await Post.findById(post_id);
      if (!post) {
        return res.status(400).send('Post not found');
      }

      const user = await User.findById(user_id);

      // compile comment object
      const commentObject = {};
      commentObject.text = req.body.text;
      commentObject.user = user_id;
      commentObject.name = user.name;
      commentObject.avatar = user.avatar;

      post.comments.push(commentObject);
      post = await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route PUT api/posts/comment/remove/:comment_id/:post_id
// @desc Remove comment from post
// @access Private
router.put('/comment/remove/:comment_id/:post_id', auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.json(errors);
  }

  let post_id = req.params.post_id;
  let comment_id = req.params.comment_id;
  let user_id = res.user.id;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(400).send('Post not found');
  }

  if (!mongoose.Types.ObjectId.isValid(comment_id)) {
    return res.status(400).send('Comment not found');
  }

  try {
    post = await Post.findById(post_id);
    if (!post) {
      return res.status(400).send('Post not found');
    }

    // check if the comment exists in the specific post

    var commentExists = post.comments.some(function (comment) {
      return comment.id == comment_id;
    });

    if (!commentExists) {
      return res.status(400).json({ msg: 'Comment not found' });
    }

    post = await Post.findByIdAndUpdate(
      post_id,
      { $pull: { comments: { _id: comment_id } } },
      { new: true }
    );

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
