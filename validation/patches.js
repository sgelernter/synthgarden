const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePatchInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  data.oscillator.osctype = validText(data.oscillator.osctype) ? data.oscillator.osctype : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.oscillator.osctype)) {
    errors.oscillator = 'Oscillator settings are required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};