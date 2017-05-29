let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);
var Group = require('../models/Group');
var User = require('../models/User');




//MODEL: Users_group
var Users_group = bookshelf.Model.extend({
    tableName: 'users_groups',
    user: function () {
        return this.belongsTo(User);
    },
    group: function () {
        return this.belongsTo(Group);
    },
    hasTimestamps: true

});

module.exports = Users_group;