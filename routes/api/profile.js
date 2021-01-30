const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const { compareSync } = require('bcryptjs');
const { json } = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../../models/User');

// @route GET api/profile/me
// @desc Get user specific profile
// @access Public
router.get('/me', auth, async (req, res) => {
  try {
    // query the Profile model
    const profile = await Profile.findOne({
      user: res.user.id,
    }).populate('User', ['name', 'email', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        errors: {
          errors: [{ msg: 'User profile not found.' }],
        },
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.send(500).send('Server error.');
  }
});

// @route POST api/profile
// @desc Create or update a profile
// @access Public
router.post(
  '/',
  [auth, [check('status', 'Status cant be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
    } = req.body;
    const profileObject = {};
    //profileObject.user = res.user.id;
    if (company) profileObject.company = company;
    if (website) profileObject.website = website;
    if (location) profileObject.location = location;
    if (status) profileObject.status = status;
    if (skills)
      profileObject.skills = skills.split(',').map((skill) => skill.trim()); // todo: skills should be turned into a array
    if (bio) profileObject.bio = bio;
    if (githubusername) profileObject.githubusername = githubusername;
    profileObject.social = {};
    const { youtube, twitter, facebook, linkedin, instagram } = req.body.social;
    if (youtube) profileObject.social.youtube = youtube;
    if (twitter) profileObject.social.twitter = twitter;
    if (facebook) profileObject.social.facebook = facebook;
    if (linkedin) profileObject.social.linkedin = linkedin;
    if (instagram) profileObject.social.instagram = instagram;

    try {
      profile = await Profile.findOne({ user: res.user.id });
      if (profile) {
        // Update User
        profile = await Profile.findOneAndUpdate(
          { user: res.user.id },
          profileObject,
          {
            new: true,
          }
        );
        return res.json(profile);
      }
      // Create New User
      profileObject.user = res.user.id;
      profile = new Profile(profileObject);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', [
      'name',
      'email',
      'avatar',
    ]);

    if (profiles) {
      return res.json(profiles);
    }
    return res.status(400).send('No profiles found');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

// @route GET api/profile/:user_id
// @desc Get profile by user id
// @access Public
router.get('/:user_id', async (req, res) => {
  let user_id = req.params.user_id;
  if (!ObjectId.isValid(user_id)) {
    return res.status(400).send('No profiles found');
  }

  try {
    let profile = await Profile.findOne({
      user: user_id,
    }).populate('user', ['name', 'email', 'avatar']);

    if (profile) {
      return res.json(profile);
    }
    return res.status(400).send('No profiles found');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

// @route DELETE api/profile
// @desc Delete profile by user id
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    const user_id = res.user.id;
    const user = await User.findByIdAndDelete(user_id);
    const profile = await Profile.findOneAndDelete({ user: user_id });

    return res.send('Profile deleted!');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

// @route PUT api/profile/experience
// @desc Add a new experience to a profile
// @access Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title cant be blank').not().isEmpty(),
      check('company', 'Compnay cant be blank').not().isEmpty(),
      check('location', 'Location cant be blank').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // handle validation errors
    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty()) {
      return res.status(400).json(validation_errors);
    }

    const user_id = res.user.id;
    // get request params
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const experienceObject = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      profile = await Profile.findOneAndUpdate(
        { user: user_id },
        {
          $push: { experience: experienceObject },
        },
        { new: true }
      );
      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
