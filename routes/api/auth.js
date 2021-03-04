const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
var bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// @route GET api/auth
// @desc Get authenticated user (protected route)
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    user = await User.findById(res.user.id).select('-password');
    if (!user) {
      res.status(401).send('User not authenticated.');
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(401).send('User not authenticated.');
  }
});

// @route POST api/auth
// @desc Login User
// @access Public
router.post(
  '/',
  [
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
  ],
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }

    try {
      const { password, email } = req.body;

      user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: { errors: [{ msg: 'Invalid Credentials' }] } });
      }

      // check if the password matches
      const is_password_match = await bcrypt.compare(password, user.password);

      if (!is_password_match) {
        return res
          .status(400)
          .json({ errors: { errors: [{ msg: 'Invalid Credentials' }] } });
      }

      // return a jwt once the user has registered
      // send the user id in a jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      const jwt = jsonwebtoken.sign({ payload }, config.get('jwtSecret'), {
        expiresIn: 360000,
      });

      res.send({ token: jwt });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  }
);

module.exports = router;
