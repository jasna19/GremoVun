let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

var Message = bookshelf.Model.extend({
    tableName: 'messages',
    group: function () {
        return this.belongsTo(Group);
    },
    author: function () {
        return this.belongsTo(User)
    }
});





//USLESS 
