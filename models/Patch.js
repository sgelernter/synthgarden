const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatchSchema = new Schema({
    username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      timestamps: true
})

module.exports = Patch = mongoose.model('Patch', PatchSchema);