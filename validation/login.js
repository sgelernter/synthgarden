const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {

    let errors = {};
    
    data.email = validText(data.email) ? data.email : '';
    data.username = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'You must enter a password';
    }

    if (Validator.isEmpty(data.email) && Validator.isEmpty(data.username)) {
        errors.login = 'You must enter a username or email';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

// LOGIN NEEDS TO BE FACTORED TO ACCOUNT FOR VARIABLE INPUT