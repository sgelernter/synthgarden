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
    octave: {
        type: Number,
        required: true
    },
    eq: {
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
        LFO: {
            type: Number,
            required: true
        },
        delay: {
            type: Number,
            required: true 
        },
        depth: {
            type: Number, 
            required: true
        }
    },
    tremolo: {
        frequency: {
            type: Number,
            required: true 
        },
        depth: {
            type: Number, 
            required: true
        }
    },
    harmonics: {
        type: Boolean,
        required: true
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