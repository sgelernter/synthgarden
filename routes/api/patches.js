const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Patch = require("../../models/Patch");
const validatePatchInput = require("../../validation/patches");

router.post('/',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validatePatchInput(req.body);

        if(!isValid) return res.status(400).json(errors);
        const newPatch = new Patch({
          name: req.body.name,
          user: req.body.user,
          oscillator: {
              osctype: req.body.oscillator.osctype,
              attack: req.body.oscillator.attack,
              sustain: req.body.oscillator.sustain,
              release: req.body.oscillator.release
          },
          octave: req.body.octave,
          eq: {
              low: req.body.eq.low,
              mid: req.body.eq.mid,
              high: req.body.eq.high
          },
          mods: req.body.mods,
          chorus: {
              LFO: req.body.chorus.LFO,
              delay: req.body.chorus.delay,
              depth: req.body.chorus.depth
          },
          tremolo: {
              frequency: req.body.tremolo.frequency,
              depth: req.body.tremolo.depth
          },
          harmonics: req.body.harmonics,
          selectedHarmonics: req.body.selectedHarmonics,
          distortion: {
              amt: req.body.distortion.amt
          },
          bitCrusher: {
              bitDepth: req.body.bitCrusher.bitDepth,
              amount: req.body.bitCrusher.amount
          },
          delay: req.body.delay,
          selectedDelay: req.body.selectedDelay,
          feedback: {
              time: req.body.feedback.time,
              fb: req.body.feedback.fb,
              amt: req.body.feedback.amt
          },
          pingPong: {
            time: req.body.pingPong.time,
            fb: req.body.pingPong.fb,
            amt: req.body.pingPong.amt
          },
          signalChain: req.body.signalChain
        })

        newPatch
            .save()
            .then(patch => res.json(patch))
    }
);

router.patch('/:id',
    passport.authenticate("jwt", { session: false }),
    (async (req, res) => {
        Patch.findById(req.params.id)
             .then(patch => {
                patch.name = req.body.name;
                patch.oscillator.osctype = req.body.oscillator.osctype;
                patch.oscillator.attack = req.body.oscillator.attack;
                patch.oscillator.sustain = req.body.oscillator.sustain;
                patch.oscillator.release = req.body.oscillator.release;
                patch.octave = req.body.octave;
                patch.eq.low = req.body.eq.low;
                patch.eq.mid = req.body.eq.mid;
                patch.eq.high = req.body.eq.high;
                patch.mods = req.body.mods;
                patch.chorus.LFO = req.body.chorus.LFO;
                patch.chorus.delay = req.body.chorus.delay;
                patch.chorus.depth = req.body.chorus.depth;
                patch.tremolo.frequency = req.body.tremolo.frequency; 
                patch.tremolo.depth = req.body.tremolo.depth;
                patch.harmonics = req.body.harmonics;
                patch.selectedHarmonics = req.body.selectedHarmonics;
                patch.distortion.amt = req.body.distortion.amt;
                patch.bitCrusher.bitDepth = req.body.bitCrusher.bitDepth;
                patch.bitCrusher.amount = req.body.bitCrusher.amount;
                patch.delay = req.body.delay;
                patch.selectedDelay = req.body.selectedDelay;
                patch.feedback.time = req.body.feedback.time;
                patch.feedback.fb = req.body.feedback.fb;
                patch.feedback.amt = req.body.feedback.amt;
                patch.pingPong.time = req.body.pingPong.time;
                patch.pingPong.fb = req.body.pingPong.fb;
                patch.pingPong.amt = req.body.pingPong.amt;
                patch.save().then(() => res.json(patch))
             });
    })
)

router.get('/', (req, res) => { 
    Patch.find()
         .then(patches => res.json(patches))
         .catch(err => res.status(404).json({ nopatchesfound: 'There are no patches, start jamming now!' }));
    }
);

router.get('/user/:userId', (req, res) => {
    Patch.find({user: req.params.userId})
        .then(patches => res.json(patches))
        .catch(err => res.status(404).json({ nopatchesfound: 'No patches found from this user' })
    );
});

router.get('/:id', (req, res) => {
    Patch.findById(req.params.id)
        .then(patch => res.json(patch))
        .catch(err => res.status(404).json({ nopatchfound: 'No patch found with that ID' })
    );
});

router.delete('/:id',
    passport.authenticate("jwt", { session: false}),
    (req, res) => {
        Patch.findByIdAndDelete(req.params.id)
              .then(patch => res.json(patch))
              .catch(err => res.status(404).json(err))
    }
);

module.exports = router;