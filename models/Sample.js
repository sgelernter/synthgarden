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
    timestamps: true
})

module.exports = Sample = mongoose.model('Sample', SampleSchema);