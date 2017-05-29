let express = require('express');
var router = express.Router();
var User = require('../models/User');
var Group = require('../models/Group');
var User_Group = require('../models/Users_Group');

var passwordHash = require('password-hash');

//GET ALL MY GROUPS+MEMBERSHIPS
router.get('/', (req, res, next) => {
    new User_Group().where().fetchAll({ withRelated: ['group.members'] }).then((data) => {
        res.json(data);
    });

});

//GET ALL WHERE MEMBER OR PENDING
router.get('/:username', (req, res, next) => {
    new User().where('username', req.params.username).fetch().then((user) => {
        if (user != null) {
            var idUser = user.get('id');
            new User_Group().where('user_id', idUser).fetchAll({ withRelated: ['group'] }).then((data) => {
                res.json(data);
            });


        }
    });


});

//JOIN GROUP
router.post('/', (req, res, next) => {

    new User().where('username', req.body.username).fetch().then((user1) => {
        if (user1 != null) {
            var idUser1 = user1.get('id');

            if (passwordHash.verify(req.body.password, user1.get("password"))) {
                new Group().where('name', req.body.name).fetch().then((group) => {
                    if (user1 != null && group != null) {
                        var idGroup = group.get('id');

                        var membership = new User_Group();
                        membership.set('user_id', idUser1);
                        membership.set('group_id', idGroup);
                        membership.set('status', 1);

                        let myPromise = new Promise((resolve, reject) => {
                            var groupMembership = new User_Group().where(function () {
                                this.where('user_id', idUser1).andWhere('group_id', idGroup)
                            }).fetchAll().then((data) => {
                                resolve(data)
                            });
                        });

                        myPromise.then((successMessage) => {

                            if (JSON.stringify(successMessage) == "[]") //to ni ravno najlepša koda
                            {
                                console.log(JSON.stringify(successMessage));
                                console.log("ne obstaja");
                                membership.save().then((data) => {
                                    res.json(data);
                                });


                            }
                            else {
                                res.statusCode = 400;
                                res.json({
                                    error: "Already member or already requested to join?",
                                    status: '400'
                                });
                            }
                        });

                    }
                    else {
                        res.statusCode = 400;
                        res.statusMessage = "User or group doesn't exist!"
                        res.end();
                    }
                });
            }
            else {
                res.statusCode = 400;
                res.statusMessage = "Invalid password or user!"
                res.json(error);
                res.end();
            }
        }
        else {
            res.statusCode = 400;
            res.statusMessage = "User doesn't exist!"
            res.json("NO SUCH USER!");
            res.end();
        }


    });
});

//ACCEPT DENY REQUEST
router.put('/', (req, res, next) => {
    new User().where('username', req.body.username).fetch().then((data) => {
        if (data.get('id') != null && passwordHash.verify(req.body.password, data.get("password"))) {
            idUser = data.get('id');
            console.log("user_ID:"+idUser);
            new User_Group().where(function () { this.where('name', req.body.name).andWhere('user_id', idUser) }).fetch().then((user_group) => {
                res.json( user_group );
            })

        }
        else {
            res.statusCode = 401;
            res.statusMessage = "Invalid data!";
            res.json("Wrong username or password");
            res.end();
        }
    });

});

//LEAVE GROUP
router.delete('/', (req, res, next) => {

});



module.exports = router;
