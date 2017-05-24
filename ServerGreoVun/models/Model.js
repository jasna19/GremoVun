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

//MODEL: Group
var Group = bookshelf.Model.extend({
    tableName: 'groups',
    members: function () {
        return this.hasMany(Users_group);
    },
    admin: function () {
        return this.belongsTo(User);
    },
    messages: function ()
    {
        return this.hasMany(Message);
    }
});

//MODEL: Location
var Location = bookshelf.Model.extend({
    tableName: 'locations',
    users: function () {
        return this.belongsTo(User);
    }
});

//MODEL: Message
var Message = bookshelf.Model.extend({
    tableName: 'messages',
    group: function () {
        return this.belongsTo(Group);
    },
    author: function () {
        return this.belongsTo(User)
    }
});




//MODEL: Users_group
var Users_group = bookshelf.Model.extend({
    tableName: 'users_groups',
    users: function () {
        return this.belongsTo(User);
    },
    groups: function (){
        return thi.belongsTo(Group);
    }
});

module.exports = {'Friendship':Friendship, 'Group':Group, 'Location':Location, 'Message':Message, 'User':User, 'Users_group':Users_group};