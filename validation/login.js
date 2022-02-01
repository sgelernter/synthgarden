const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {

    let errors = {};
    
    data.email = validText(data.email) ? data.email : '';
    data.username = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email cannot be blank';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'You must enter a password';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}