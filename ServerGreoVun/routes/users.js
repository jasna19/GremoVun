let express = require('express');
var router = express.Router();
var User = require('../models/User')

//ADD USER
router.post('/', (req, res, next) => {

    var user = new User();
    user.set('username', req.body.username);
    user.set('password', req.body.password);
    user.set('email', req.body.email);

    user.save().then(function (model) {
        res.statusCode = 201;
        res.statusMessage = "Succesfully created"
        res.json(user);
    }).catch(function (error) {
        res.statusCode = 400;
        res.statusMessage = "Invalid data!"
        res.json(error);
        res.end();
    });
});

router.get('/:id', (req, res, next) => {
    new User().where(function () {
        this.where('id', req.params.id)
    }).fetchAll().then((data) =>
        res.json(data)
        );
});



router.get('/', (req, res, next) => {
    new User().fetchAll().then((data) => {
        res.json(data);
    });
});



module.exports = router;
