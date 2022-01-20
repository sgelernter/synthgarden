const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Patch = require("../../models/Patch");
const validatePatchInput = require("../../validation/patches");

//create patch
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
          }
        })

        newPatch
            .save()
            .then(patch => res.json(patch))
    }
);
 
//edit patch name
// router.put('/:id',
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         Patch.findOneAndUpdate(req.params.id)
//              .then(patch => patch.name = req.body.name)
//              .catch(err => res.status(404).json(err))
//     }
// )

//showing all the patches
router.get('/', (req, res) => { 
    Patch.find()
         .then(patches => res.json(patches))
         .catch(err => res.status(404).json({ nopatchesfound: 'There are no patches, start jamming now!' }));
    }
);

//showing all the patches under a specific user
router.get('/user/:userId', (req, res) => {
    Patch.find({user: req.params.userId})
        .then(patches => res.json(patches))
        .catch(err => res.status(404).json({ nopatchesfound: 'No patches found from this user' })
    );
});

//showing a specific patch
router.get('/:id', (req, res) => {
    Patch.findById(req.params.id)
        .then(patch => res.json(patch))
        .catch(err => res.status(404).json({ nopatchfound: 'No patch found with that ID' })
    );
});

//delete specific patch
router.delete('/:id',
    passport.authenticate("jwt", { session: false}),
    (req, res) => {
        Patch.findByIdAndDelete(req.params.id)
            //   .then(patch => res.json(patch))
              .then(() => res.json({ msg: "This patch has been deleted" }))
              .catch(err => res.status(404).json(err))
    }
);

module.exports = router;