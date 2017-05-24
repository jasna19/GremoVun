let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

//MODEL: Friendship
var Friendship = bookshelf.Model.extend({
    tableName: 'friendships',
    user: function () {
        return this.belongsTo(User, 'user_id');
    },
    friend: function () {
        return this.belongsTo(User, 'friend_id')
    }
});

module.exports = Friendship;