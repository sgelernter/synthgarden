const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Sample = require("../../models/Sample");
const validateSampleInput = require("../../validation/samples");

router.post('/',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        debugger
        const { isValid, errors } = validateSampleInput(req.body);
        if(!isValid) return res.status(400).json(errors);

        const newSample = new Sample({
            user: req.user.id,
            name: req.body.name,
            // file: req.body.blobToBase64
        })

        newSample
            .save()
            .then(sample => res.json(sample))
    }
)

//showing all the samples
router.get('/', (req, res) => {
    Sample.find()
          .then(samples => res.json(samples))
          .catch(err => res.status(404).json({ nosamplesfound: 'There are no samples, start jamming now!' }));
    }
);

//showing all the samples under a specific user
router.get('/user/:userId', (req, res) => {
    Sample.find({user: req.params.userId})
        .then(samples => res.json(samples))
        .catch(err => res.status(404).json({ nosamplesfound: 'No samples found from this user' })
    );
});

//showing a specific sample
router.get('/:id', (req, res) => {
    Sample.findById(req.params.id)
        .then(sample => res.json(sample))
        .catch(err => res.status(404).json({ nosamplefound: 'No sample found with that ID' })
    );
});

//delete specific patch
router.delete('/:id',
    passport.authenticate("jwt", { session: false}),
    (req, res) => {
        Sample.findByIdAndDelete(req.params.id)
            //   .then(sample => res.json(sample))
              .then(() => res.json({ msg: "This sample has been deleted" }))
              .catch(err => res.status(404).json(err))
    }
);

module.exports = router;