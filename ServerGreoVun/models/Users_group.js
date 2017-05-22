let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

var Users_group = bookshelf.Model.extend({
    tableName: 'users_groups',
    users: function () {
        return this.belongsTo(User);
    },
    groups: function (){
        return thi.belongsTo(Group);
    }
});
