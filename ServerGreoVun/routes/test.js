let express = require('express');
var router = express.Router();



let config = require('../knexfile');
let knex = require('knex')(config.development), bookshelf = require('bookshelf')(knex);
let User = require('../models/User.js');


router.get('/', (req, res, next) => {
    new User().fetchAll().then((data) => {
        res.json(data);
    });
});
