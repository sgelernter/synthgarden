const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Patch = mongoose.model('Patch', PatchSchema);