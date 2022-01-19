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
    oscillator: {
        osctype: {
            type: String,
            required: true
        },
        attack: {
            type: Number,
            required: true
        },
        sustain: {
            type: Number,
            required: true
        },
        release: {
            type: Number,
            required: true
        }
    },
    equalizer: {
        low: {
            type: Number,
            required: true
        },
        mid: {
            type: Number,
            required: true
        },
        high: {
            type: Number,
            required: true
        },
    },
    mods: {
        type: Boolean,
        required: true    
    },
    chorus: {
        type: Number
    },
    tremelo: {
        type: Number
    },
    distortion: {
        amount: {
            type: Number
        }
    },
    bitCrusher: {
        bitDepth: {
            type: Number
        },
        amount: {
            type: Number
        }
    },
    delay: {
        type: Boolean,
        required: true
    },
    feedback: {
        time: {
            type: Number
        },
        fb: {
            type: Number
        },
        amt: {
            type: Number
        }
    },
    pingPong: {
        time: {
            type: Number
        },
        fb: {
            type: Number
        },
        amt: {
            type: Number
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Patch = mongoose.model('Patch', PatchSchema);