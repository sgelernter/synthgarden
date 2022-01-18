const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const Validator = require('validator');
const User = require('../../models/User');
const passport = require('passport');

router.get('/test', (req, res) => res.json({ msg: 'USERS ROUTE TEST SUCCESS'}));


// REGISTER NEW USER
router.post('/register', (req, res) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({email: 'There is already a user with that email address'});
            } else {
                User.findOne({ username: req.body.username })
                    .then(user => {
                        if (user) {
                            return res.status(400).json({username: 'That username is not available'});
                        } else {
                            const newUser = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: req.body.password
                            });

                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    newUser.password = hash;
                                    newUser.save()
                                        .then(user => {
                                            const payload = { id: user.id, email: user.email, username: user.username };

                                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                                res.json({
                                                    success: true,
                                                    token: 'Bearer ' + token
                                                });
                                            });
                                        })
                                        .catch(err => console.log(err));
                                });
                            });
                        }
                    });
            }
        });
});


// CHECK LOGIN CREDENTIALS w/BCRYPT
const checkPassword = (password, passwordInput, user) => {
    
    bcrypt.compare(password, passwordInput)
        .then(isMatch => {
            if (isMatch) {
                const payload = {id: user.id, email: user.email, username: user.username};

                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                return res.status(400).json({password: 'Incorrect password'});
            }
        });
}

// LOGIN USER
router.post('/login', (req, res) => {

    // NOT SURE WHAT THIS WILL BE CALLED ON THE WAY IN FROM THE FRONT-END FORM
    // console.log(res)
    const idString = req.body.email;
    const password = req.body.password;
    console.log(idString)

    User.findOne({email: idString})
        .then(user => {
            if (!user) {
                User.findOne({username: idString})
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({id: 'Invalid email/username'})
                        } else {
                            checkPassword(password, user.password, user);
                        }
                    });
            } else {
                checkPassword(password, user.password, user);
            }
        });
});

// USER PASSPORT AUTHENTICATION ROUTE
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    })
    }
);





module.exports = router;