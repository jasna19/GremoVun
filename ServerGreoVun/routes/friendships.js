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
                new User().where('username', req.body.friendname).fetch().then((user2) => {
                    var idUser2 = user2.get('id');
                    if (user1 != new User() && user2 != new User() && idUser1 != idUser2) {

                        var friendship = new Friendship();
                        friendship.set('user_id', idUser1);
                        friendship.set('friend_id', idUser2);
                        friendship.set('status', 1);

                        let myPromise = new Promise((resolve, reject) => {
                            var friendList = new Friendship().where(function () {
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

//GET FRIENDSHIPS OF USER
router.get('/:username', (req, res, next) => {
    var username = req.params.username;
    console.log(username);
    new User().where('username', username).fetch().then((user) => {
        var user_id = user.get('id');
        new Friendship().where(function () {
            this.where('user_id', user_id).orWhere('friend_id', user_id)
        }).fetchAll().then((data) =>
            res.json(data)
            );
    });
});

router.put('/', (req, res, next) => {

if(req.body.status == "accept")

    new Friendship().where(function () {
        this.where(function () {
            this.where('user_id',  req.body.idUporabnik1).andWhere('friend_id', req.body.idUporabnik2)
        }).orWhere(function () {
            this.where('user_id', req.body.idUporabnik2).andWhere('friend_id', req.body.idUporabnik1)
        })
    }).fetch().then(function (friendship) {
        friendship.save(
            {
                status: 2
            }
        ).then(function (saved) {
            res.json({ saved });
        });

    })
}
);



module.exports = router;
