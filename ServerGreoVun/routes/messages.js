let express = require('express');
var router = express.Router();
var User = require('../models/User');
var Group = require('../models/Group');
var Message = require('../models/Message');
var User_Group = require('../models/Users_Group');
var passwordHash = require('password-hash');

//SEND MESSAGE
router.put('/', (req, res, next) => {
    new User().where('username', req.body.username).fetch().then((user) => {
        if (user != null && passwordHash.verify(req.body.password, user.get("password"))) {
            var idUser = user.get('id');
            console.log("ID:" + idUser);
            new Group().where('name', req.body.group).fetch().then((group) => {
                if (group != null) {
                    var idGroup = group.get('id');
                    new User_Group().where(function () { this.where('group_id', idGroup).andWhere('user_id', idUser).andWhere('status', 2) }).fetch().then((user_group) => {
                        if (user_group != null) {
                            var message = new Message();
                            message.set('username', req.body.username);
                            message.set('group_id', idGroup);
                            message.set('text', req.body.message);
                            message.save().then(function (model) {
                                res.statusCode = 201;
                                res.statusMessage = "Succesfully created"
                                res.json(user);
                            }).catch(function (error) {
                                res.statusCode = 400;
                                res.statusMessage = "Invalid data!"
                                res.json(error);
                                res.end();
                            });

                        }
                        else {
                            res.statusCode = 401;
                            res.statusMessage = "Invalid data!";
                            res.json("User doesn't belong to group!");
                            res.end();
                        }
                    });
                }
                else {
                    res.statusCode = 401;
                    res.statusMessage = "Invalid data!";
                    res.json("Group doesn't exist!");
                    res.end();
                }
            });
        }
        else {
            res.statusCode = 401;
            res.statusMessage = "Invalid data!";
            res.json("Wrong username or password");
            res.end();
        }
    });

});

//GET MESSAGES OF GROUP
router.post('/', (req, res, next) => {


    new User().where('username', req.body.username).fetch().then((user) => {
        if (user != null && passwordHash.verify(req.body.password, user.get("password"))) {
            var idUser = user.get('id');
            console.log("ID:" + idUser);
            new Group().where('name', req.body.group).fetch().then((group) => {
                if (group != null) {
                    var idGroup = group.get('id');
                    new User_Group().where(function () { this.where('group_id', idGroup).andWhere('user_id', idUser).andWhere('status', 2) }).fetch().then((user_group) => {
                        if (user_group != null) {
                            new Message().where('group_id', idGroup).query(function (qb) {qb.limit(50);}).fetchAll().then((messages) => {
                                res.json(messages);
                            });

                        }
                        else {
                            res.statusCode = 401;
                            res.statusMessage = "Invalid data!";
                            res.json("User doesn't belong to group!");
                            res.end();
                        }
                    });
                }
                else {
                    res.statusCode = 401;
                    res.statusMessage = "Invalid data!";
                    res.json("Group doesn't exist!");
                    res.end();
                }
            });
        }
        else {
            res.statusCode = 401;
            res.statusMessage = "Invalid data!";
            res.json("Wrong username or password");
            res.end();
        }
    });
});



module.exports = router;
