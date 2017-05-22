let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

var Location = bookshelf.Model.extend({
    tableName: 'locations',
    users: function () {
        return this.belongsTo(User);
    }
});
