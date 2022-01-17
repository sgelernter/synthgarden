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
    timestamps: true
})

module.exports = Patch = mongoose.model('Patch', PatchSchema);