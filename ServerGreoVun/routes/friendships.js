let express = require('express');
var router = express.Router();
var User = require('../models/User');
var Friendship = require('../models/Friendship');

var passwordHash = require('password-hash');

//ADD FRIENDSHIP
router.post('/', (req, res, next) => {

    new User().where('username', req.body.username).fetch().then((user1) => {
        var idUser1 = user1.get('id');

        if (user1 != null) {
            if (passwordHash.verify(req.body.password, user1.get("password"))) {
                new User().where('friendname', req.body.username).fetch().then((user2) => {
                    var idUser2 = user2.get('id');
                    if (user1 != new User() && user2 != new User()) {

                        var friendship = new Friendship();
                        friendship.set('user_id', idUser1);
                        friendship.set('friend_id', idUser2);
                        friendship.set('status', 1);

                        let myPromise = new Promise((resolve, reject) => {
                            var friendList = new Poznanstvo().where(function () {
                                this.where(function () {
                                    this.where('user_id', idUser1).andWhere('friend_id', idUser2)
                                }).orWhere(function () {
                                    this.where('user_id', idUser2).andWhere('friend_id', idUser1)
                                })
                            }).fetchAll().then((data) => {
                                //new Poznanstvo().save(req.body).then((data) => {
                                resolve(data)
                                //res.json(data);
                            });
                        });

                        myPromise.then((successMessage) => {

                            if (JSON.stringify(successMessage) == "[]") //to ni ravno najlepša koda
                            {
                                console.log(JSON.stringify(successMessage));
                                console.log("ne obstaja");
                                friendship.save().then((data) => {
                                    res.json(data);
                                });


                            }
                            else {
                                res.statusCode = 400;
                                res.json({
                                    error: "Napaka: Uporabnik 1 == Uporabnik 2 ali Prijateljstvo že obstaja",
                                    status: '400'
                                });
                            }
                        });

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
            res.json(error);
            res.end();
        }


    });
});


user1.set('username', req.body.username);
user1.set('password', passwordHash.generate(req.body.password));
user1.set('email', req.body.email);

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
    new User().where('username', req.body.username).fetch().then((data) => {
        if (data.get('id') != null && passwordHash.verify(req.body.password, data.get("password"))) {
            new User().where({ 'username': req.body.username, 'password': data.get("password") }).fetch().then(function (user) {
                var newPassword = passwordHash.generate(req.body.newPassword);
                user.save(
                    {
                        password: newPassword
                    }
                ).then(function (saved) {
                    res.json({ saved });
                });
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

//DELETE UPORABNIK

router.delete('/', (req, res, next) => {
    new User().where('username', req.body.username).fetch().then((data) => {
        if (passwordHash.verify(req.body.password, data.get("password"))) {
            new User().where({ 'username': req.body.username }).destroy().then(function (destroyed) {
                res.json({ destroyed });
            });
        }
        else {
            res.json("Invalid username or password!");
            res.statusCode = 401;
            res.end();
        }

    });

});



module.exports = router;
