const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    User.create(req.body).then((user) => {
        res.json({
            response: {
                name: user.name,
                email: user.email,
                user_type: user.user_type
            },
            success: true
        })
    }).catch((err) => {
        res.status(422).json({
            response: err.message,
            success: false
        })
    });
});

router.post('/signin', (req, res) => {
    User.findOne({'email': req.body.email, 'password': req.body.password}, 'name email', function (err, user) {
        if (err) return handleError(err);
        if(!user) {
            res.json({
                response: 'fail in authentication',
                success: false
            });
        }
        else {
            const token = jwt.sign({email: user.email}, 'bobesponja63');
            res.json({
                response: token,
                success: true
            })
        }
    });
});

module.exports = router;