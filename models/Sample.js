const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SampleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    file: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Sample = mongoose.model('Sample', SampleSchema);