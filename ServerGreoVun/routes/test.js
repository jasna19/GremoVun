let express = require('express');
var router = express.Router();
var User = require('../models/User')



router.get('/', (req, res, next) => {
new User().fetchAll().then((data) => {
        res.json(data);
    });});

module.exports = router;
