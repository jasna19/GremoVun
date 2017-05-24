let express = require('express');
var router = express.Router();
var Location = require('../models/Location')


//ADD LOCATION
router.post('/', (req, res, next) => {

    var location = new Location();
    location.set('latitude', req.body.latitude);
    location.set('longitude', req.body.longitude);


    location.save().then(function (model) {
        res.statusCode = 201;
        res.statusMessage = "Succesfully added"
        res.json(user);
    }).catch(function (error) {
        res.statusCode = 400;
        res.statusMessage = "Invalid data!"
        res.json(error);
        res.end();
    });
});

module.exports = router;
