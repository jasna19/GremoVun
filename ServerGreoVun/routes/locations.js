let express = require('express');
var router = express.Router();
var Location = require('../models/Location')
var User = require('../models/User')

//ADD or UPDATE location
router.put('/', (req, res, next) => {

    var location = new Location();

    var lat = parseFloat(req.body.latitude);
    var lon = parseFloat(req.body.longitude);

    new User().where('username', req.body.username).fetch().then((data) => {
        var id = data.get('id');

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
            }
            else {
                var loc = new Location();
                loc.set('user_id', id);
                loc.set('latitude', lat);
                loc.set('longitude', lon);
                loc.save().then(function (saved) {
                    res.json({ saved });
                });

            }
        }
        );
    });
});



module.exports = router;
