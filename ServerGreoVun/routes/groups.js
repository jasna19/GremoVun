let express = require('express');
var router = express.Router();
var User = require('../models/User');
var Group = require('../models/Group');
var User = require('../models/User');


var passwordHash = require('password-hash');

//GET ALL GROUPS
router.get('/', (req, res, next) => {
    new Group().fetchAll({ withRelated: ['members.user'] }).then((data) => {
        res.json(data);
    });
});

//GET ALL WHERE OWNER
router.get('/:username', (req, res, next) => {

    new User().where('username', req.body.username).fetch({ withRelated: ['members.user'] }).then((data) => {

        if (data != null) {

            var idUser = data.get('id');

            new User().where(function () {
                this.where('id', req.params.id)
            }).fetchAll().then((data) =>
                res.json(data)
                );
        }
    });
});

//CREATE GROUP
router.post('/', (req, res, next) => {
    new Group().where('name', req.body.name).fetch().then((validate) => {
        if (validate == null) {
            new User().where('username', req.body.username).fetch().then((user) => {
                if (user != null) {
                    var idUser = user.get('id');

                    if (passwordHash.verify(req.body.password, user.get("password"))) {


                        var group = new Group();
                        group.set('user_id', idUser);
                        group.set('name', req.body.name);
                        group.save().then((data => {
                            res.json(data);
                        }));
                    }
                    else {
                        res.statusCode = 400;
                        res.statusMessage = "Invalid password or user!"
                        res.json("INVALID CREDENTIALS");
                        res.end();
                    }
                }
                else {
                    res.statusCode = 400;
                    res.statusMessage = "User doesn't exist!"
                    res.json("NO USER FOUND");
                    res.end();
                }
            });
        }
        else {
            res.statusCode = 400;
            res.statusMessage = "Group already exists!"
            res.json("INVALID GROUP NAME");
            res.end();
        }

    });
});

//DELETE GROUP
router.delete('/', (req, res, next) => {
    new User().where('username', req.body.username).fetch().then((user) => {
        if (user != null) {
            var idUser = user.get('id');
            if (passwordHash.verify(req.body.password, user.get("password"))) {
                new Group().where(function () { this.where('user_id', idUser).andWhere('name', req.body.name) }).destroy().then(function (destroyed) {
                    res.json(destroyed);
                });
            }
            else {
                res.json("Invalid username or password!");
                res.statusCode = 401;
                res.end();
            }
        }
    });
});



module.exports = router;
