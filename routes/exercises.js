const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ensureToken = require('../middleware/ensuretoken');
const Category = require('../schemas/categories');

router.get('/exercise', ensureToken, (req, res) => {
    jwt.verify(req.token, 'bobesponja63', (err, data) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            Category.find({}).then((category) => {
                res.json({
                    response: category,
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

router.get('/category/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, 'bobesponja63', (err, data) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            Category.find({_id: req.params.id}).then((category) => {
                res.json({
                    response: category,
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

router.put('/category/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, 'bobesponja63', (err, data) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            if('title', 'description' in req.body) {

            let query = {_id: req.params.id};
            Category.update(query, {title: req.body.title, description: req.body.description}).then((category) => {
                res.json({
                    response: 'Category updated',
                    success: true
                })
            }).catch((err) => {
                res.status(422).json({
                    response: err.message,
                    success: false
                })
            });

            }
            else {
                res.json({
                    response: 'title and description are required keys'
                });
            }
        }
    });
});

router.delete('/category/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, 'bobesponja63', (err, data) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            let query = {_id: req.params.id};
            Category.remove(query).then((category) => {
                res.json({
                    response: 'Category deleted',
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