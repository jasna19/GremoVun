let express = require('express'),
    router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
    tableName: 'uporabniki',
    sporocila: function () {
        return this.hasMany(Sporocilo);
    },
    lokacija: function () {
        return this.hasOne(Lokacija)
    },
    poznanstva: function () {
        return this.hasMany(Poznanstvo)
    },
    adminGroups: function()
    {
        return this.hasMany(Group)
    },
    memberGroups: function()
    {
        return this.hasMany(Users_group)
    }




});





//USLESS 
