var validator = require('validator');
var crypto = require('crypto');

//salt to be used with cipher
const CIPHER_SALT = "salt";

module.exports = {

    validateEmail: function(email, res) {
        if(!validator.isEmail(email)) {
            res.status(500).json({
                "status": false,
                "message": "The email provided is not valid."
            });
            return;
        }
    },

    validatePassword: function(password, res) {
        if(password.length < 8) {
            res.status(500).json({
                "status": false,
                "message": "The password must be at least 8 characters."
            });
            return;
        }
    },

    encryptPassword: function(password) {
        var cipher = crypto.createCipher('aes192', CIPHER_SALT);
        var encryptedPass = cipher.update(password, 'utf-8', 'hex');
        encryptedPass += cipher.final('hex');
        return encryptedPass;
    },

    checkUndefinedType: function(value, res) {
        if(typeof value == 'undefined') {
            res.status(500).json({
                "status": false,
                "message": "Provided value is of undefined type."
            });
            return;
        }
    }
}