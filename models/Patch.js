const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timestamps: true
})

module.exports = Patch = mongoose.model('Patch', PatchSchema);