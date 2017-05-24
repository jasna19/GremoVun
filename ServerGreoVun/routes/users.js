let express = require('express');
var router = express.Router();
var User = require('../models/User');
var passwordHash = require('password-hash');

//ADD USER
router.post('/', (req, res, next) => {

    var user = new User();
    user.set('username', req.body.username);
    user.set('password', passwordHash.generate('password123'));
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

//GET USER BY ID
router.get('/:id', (req, res, next) => {
    new User().where(function () {
        this.where('id', req.params.id)
    }).fetchAll().then((data) =>
        res.json(data)
        );
});


//GET ALL USERS
router.get('/', (req, res, next) => {
    new User().fetchAll().then((data) => {
        res.json(data);
    });
});

//UPDATE USER PASSWORD
router.put('/', (req, res, next) => {

    var user = new User().where({ 'username': req.body.username, 'password': req.body.password }).fetch();
    if (user.id != null) {
        new User().where({'username': req.body.username, 'password':req.body.password}).fetch().then(function (user) {
            user.save(
                {
                    password: req.body.newPassword
                }
            ).then(function (saved) {
                res.json({ saved });
            });
        })
    }
    else
    {
        res.statusCode = 400;
        res.statusMessage = "Invalid data!"
        res.json("Wrong username or password");
        res.end();
    }
}
);

//DELETE UPORABNIK

router.delete('/', (req, res, next) => {
    new User().where({ 'username': req.body.username, 'password': req.body.password }).destroy().then(function (destroyed) {
        res.json({ destroyed });
    });
});



module.exports = router;
