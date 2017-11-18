const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ensureToken = require('../middleware/ensuretoken');
const Category = require('../schemas/categories');

router.post('/category', ensureToken, (req, res) => {
    jwt.verify(req.token, 'bobesponja63', (err, data) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            Category.create(req.body).then((category) => {
                res.json({
                    response: 'Category created',
                    success: true
                })
            }).catch((err) => {
                res.status(422).json({
                    response: err.message,
                    success: false
                })
            });
        }
    });
});

module.exports = router;