const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const { compareSync } = require('bcryptjs');
const { json } = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../../models/User');
const config = require('config');
const request = require('request');

// @route GET api/profile/me
// @desc Get user specific profile
// @access Private
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
    res.status(500).send('Server error.');
  }
});

// @route POST api/profile
// @desc Create or update a profile
// @access Private
router.post(
  '/',
  [auth, [check('status', 'Status cant be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
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
    if (company) profileObject.company = company;
    if (website) profileObject.website = website;
    if (location) profileObject.location = location;
    if (status) profileObject.status = status;
    if (skills)
      Array.isArray(skills)
        ? (profileObject.skills = skills)
        : (profileObject.skills = skills.split(','));
    if (bio) profileObject.bio = bio;
    if (githubusername) profileObject.githubusername = githubusername;
    if (req.body.social) {
      profileObject.social = {};
      const {
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
      } = req.body.social;
      if (youtube) profileObject.social.youtube = youtube;
      if (twitter) profileObject.social.twitter = twitter;
      if (facebook) profileObject.social.facebook = facebook;
      if (linkedin) profileObject.social.linkedin = linkedin;
      if (instagram) profileObject.social.instagram = instagram;
    }

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

// @route DELETE api/profile/experience/:exp_id
// @desc Delete profile experience by id
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  const exp_id = req.params.exp_id;
  const user_id = res.user.id;
  if (!ObjectId.isValid(exp_id)) {
    return res.status(400).send('Experience not found');
  }

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: user_id },
      { $pull: { experience: { _id: exp_id } } },
      { new: true }
    );
    return res.json(profile);
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

// @route PUT api/profile/education
// @desc Add a new education to a profile
// @access Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School can not be blank').not().isEmpty(),
      check('degree', 'Degree can not be blank').not().isEmpty(),
      check('fieldOfStudy', 'Field Of Study can not be blank').not().isEmpty(),
      check('from', 'From field must be a valid date').isDate(),
    ],
  ],
  async (req, res) => {
    // handle validation errors
    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty()) {
      return res.status(400).json(validation_errors);
    }

    const user_id = res.user.id;

    const educationObject = ({
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body);

    try {
      profile = await Profile.findOneAndUpdate(
        { user: user_id },
        {
          $push: { education: educationObject },
        },
        { new: true }
      );

      if (!profile) {
        return res.status(400).send('No profile found for user');
      }

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc Delete education from profile by education id
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  const edu_id = req.params.edu_id;
  const user_id = res.user.id;
  if (!ObjectId.isValid(edu_id)) {
    return res.status(400).send('Education not found');
  }

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: user_id },
      { $pull: { education: { _id: edu_id } } },
      { new: true }
    );
    return res.json(profile);
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

// @route GET api/profile/github/:username
// @desc Get github info for username
// @access Public
router.get('/github/:username', async (req, res) => {
  const git_username = req.params.username;
  try {
    const request_options = {
      uri: `https://api.github.com/users/${git_username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientID'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(request_options, (error, response, body) => {
      if (error) {
        console.error(error);
      }

      if (response.statusCode !== 200) {
        console.log(response);
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      return res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
