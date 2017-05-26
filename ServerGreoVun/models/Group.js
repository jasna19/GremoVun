let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

//MODEL: Group
var Group = bookshelf.Model.extend({
    tableName: 'groups',
    members: function () {
        return this.hasMany(Users_group);
    },
    admin: function () {
        return this.belongsTo(User);
    },
    messages: function () {
        return this.hasMany(Message);
    },
    hasTimestamps: true

});

module.exports = Group;