let express = require('express');
var User = require('../../models/User');
var passwordHash = require('password-hash');



module.exports = function (username, password) {
    new User().where('username', username).fetch().then((data) => {
        if (passwordHash.verify(password, data.get("password"))) {
            console.log("FUNCTION RETURN TRUE THEN");
            return true;
        }
        else {
            console.log("FUNCTION RETURN FALSE THEN");
            return false;
        }
    });
}
