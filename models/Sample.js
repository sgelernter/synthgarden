const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SampleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timestamps: true
})

module.exports = Sample = mongoose.model('Sample', SampleSchema);