let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

//MODEL: Location
var Location = bookshelf.Model.extend({
    tableName: 'locations',
    users: function () {
        return this.belongsTo(User);
    },
    hasTimestamps: true
});

module.exports = Location;