let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

var Group = bookshelf.Model.extend({
    tableName: 'groups',
    members: function () {
        return this.hasMany(Sporocilo);
    },
    admin: function () {
        return this.hasOne(Lokacija)
    },
    messages:
   
});





//USLESS 
