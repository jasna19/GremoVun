let express = require('express');
var router = express.Router();
var Location = require('../models/Location');
var User = require('../models/User');
var passwordHash = require('password-hash');



//GET ALL LOCATIONS
router.get('/', (req, res, next) => {
    new Location().fetchAll().then((data) => {
        res.json(data);
    });
});

//GET LOCATION BY ID
router.get('/:id', (req, res, next) => {
    new Location().where(function () {
        this.where('id', req.params.id)
    }).fetchAll().then((data) =>
        res.json(data)
        );
});



//ADD or UPDATE location
router.put('/', (req, res, next) => {

    var location = new Location();

    var lat = parseFloat(req.body.latitude);
    var lon = parseFloat(req.body.longitude);

    new User().where('username', req.body.username).fetch().then((data) => {
        var id = data.get('id');
        if (id != null && passwordHash.verify(req.body.password, data.get("password"))) {
        new Location().where('user_id', id).fetch().then((location) => {
            if (location.get('id') != null) {
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
    else{
        res.statusCode = 401;
            res.statusMessage = "Invalid data!";
            res.json("Wrong username or password");
            res.end();
    }
    });
});



module.exports = router;
