let express = require('express');
var router = express.Router();
var Location = require('../models/Location');
var User = require('../models/User');
var Friendship = require('../models/Friendship');
var passwordHash = require('password-hash');



//GET ALL LOCATIONS
router.get('/', (req, res, next) => {
    new Location().fetchAll().then((data) => {
        res.json(data);
    });
});

//POST GET LOCATIONS OF USER FRIENDS
router.post('/', (req, res, next) => {
    new User().where('username', req.body.username).fetch().then((user) => {
        console.log("DOSEM");
        if (user != null && passwordHash.verify(req.body.password, user.get("password"))) {
            var idUser = user.get('id');
            console.log("ID:" + idUser);

            new Friendship().where(function () {
                this.where('user_id', idUser).orWhere('friend_id', idUser)
            }).fetchAll().then((friendships) => {
                console.log("NUMBER OF FRIENDS:" + friendships.length);
                var friendId = [];
                for (i = 1; i <= friendships.length; i++) {
                    if (friendships.get(i).get('user_id') == idUser) {
                        friendId.push(friendships.get(i).get('friend_id'));
                    }
                    else {
                        friendId.push(friendships.get(i).get('user_id'));
                    }
                }
                console.log(friendId);
                new User().query('where', 'id', 'IN', friendId).fetchAll({ withRelated: ['location'] }).then((friends) => {
                    res.json(friends);
                    res.end();

                });
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



//ADD or UPDATE location
router.put('/', (req, res, next) => {

    var location = new Location();

    var lat = parseFloat(req.body.latitude);
    var lon = parseFloat(req.body.longitude);

    new User().where('username', req.body.username).fetch().then((data) => {
        if (data != null && passwordHash.verify(req.body.password, data.get("password"))) {
            var id = data.get('id');

            new Location().where('user_id', id).fetch().then((location) => {
                if (location != null) {
                    location.set('latitude', lat);
                    location.set('longitude', lon);
                    location.save().then(function (model) {
                        res.statusCode = 201;
                        res.statusMessage = "Succesfully added"
                        res.json(location);
                    }).catch(function (error) {
                        console.log(error);
                        res.statusCode = 400;
                        res.statusMessage = "Invalid data!"
                        res.json(error);
                        res.end();
                    });
                }//end if
                else {
                    var loc = new Location();
                    loc.set('user_id', id);
                    loc.set('latitude', lat);
                    loc.set('longitude', lon);
                    loc.save().then(function (saved) {
                        res.json({ saved });
                    });

                } //end else
            }
            );//end new location
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
