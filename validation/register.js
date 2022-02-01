const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
    
    let errors = {};

    data.username = validText(data.username) ? data.username : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.confirmPassword = validText(data.confirmPassword) ? data.confirmPassword : '';

    if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = 'Username must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username cannot be blank';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email cannot be blank';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password cannot be blank';
    }

    return {
        errors, 
        isValid: Object.keys(errors).length === 0
    };
}