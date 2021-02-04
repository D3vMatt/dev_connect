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
      const postObject = ({ text, like, comments } = req.body);

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

module.exports = router;
