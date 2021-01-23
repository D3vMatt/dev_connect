const express = require('express');
const router  = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
var bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

// @route POST api/users
// @desc Register User
// @access Public
router.post('/', [
    check('name', 'Username is required').not().isEmpty(),
    check('password', 'Password must be longer than 6 characters').isLength({min: 6}),
    check('email', 'Please enter a valid email address').isEmail()
] , async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors});
    }

    try {

       const {name, password, email} = req.body;

       user = await User.findOne({email});

       if (user) {
           return res.status(400).json({errors: {'errors': [{'msg': 'User already exists.'}]}})
       }

    // Get users gravatar
    const avatar = await gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });

    // Encrypt users password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    // create user object and save user
    user = new User({
        name,
        password: hash,
        email,
        avatar
    });

    await user.save();

    // return a jwt once the user has registered
    // send the user id in a jwt
    const payload = {
        user: {
            id: user.id
        }
    }
    
    const jwt = jsonwebtoken.sign({payload}, config.get('jwtSecret'), { expiresIn: 360000 }); 

    
    res.send({"token": jwt});

        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({'errors': [{'msg': 'Server error'}]});
    }



});

module.exports = router;