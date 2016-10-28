import validator from 'validator';
import crypto from 'crypto';

//salt to be used with cipher
const CIPHER_SALT = 'salt';

export function validateEmail(email, response) {
    if(!validator.isEmail(email)) {
        response.status(500).json({
            status  : false,
            message : 'The email provided is not valid.'
        });
    }
}

export function validatePassword(password, response) {
    if(password.length < 8) {
        response.status(500).json({
            status  : false,
            message : 'The password must be at least 8 characters.'
        });
    }
}

export function encryptPassword(password) {
    const cipher = crypto.createCipher('aes192', CIPHER_SALT);
    let encryptedPass = cipher.update(password, 'utf-8', 'hex');
    encryptedPass += cipher.final('hex');
    return encryptedPass;
}

export function checkUndefinedType(value, res) {
    if(typeof value === 'undefined') {
        res.status(500).json({
            status  : false,
            message : 'Provided value is of undefined type.'
        });
    }
}
