let express = require('express'),
    router = express.Router();
let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);
var User = require('../models/User');
var Group = require('../models/Group');
var Location = require('../models/Location');
var User_Group = require('../models/Users_Group');


//MODEL: User
var User = bookshelf.Model.extend({
    tableName: 'users',
    messages: function () {
        return this.hasMany(Message);
    },
    location: function () {
        return this.hasOne(Location)
    },
    friendships: function () {
        return this.hasMany(Friendship)
    },
    adminGroups: function () {
        return this.hasMany(Group)
    },
    memberGroups: function () {
        return this.hasMany(Users_group)
    },
    hasTimestamps: true

});

module.exports = User;