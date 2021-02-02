const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');

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

module.exports = router;
