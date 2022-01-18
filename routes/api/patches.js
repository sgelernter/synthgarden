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

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const newPatch = new Patch({
            user: req.user.id,
            name: req.body.name 
        })

        newPatch
            .save()
            .then(patch => res.json(patch))
})

//showing all the patches
router.get('/', (req, res) => {
    Patch.find()
        .then(patches => res.json(patches))
        .catch(err => res.status(404).json({ nopatchesfound: 'There are no patches, start jamming now!' }));
});

//showing all the patches under a specific user
router.get('/user/:userId', (req, res) => {
    Patch.find({user: req.params.userId})
        .then(patches => res.json(patches))
        .catch(err =>
            res.status(404).json({ nopatchesfound: 'No patches found from that user' }
        )
    );
});

//showing a specific patch
router.get('/:id', (req, res) => {
    Patch.findById(req.params.id)
        .then(patch => res.json(patch))
        .catch(err =>
            res.status(404).json({ nopatchfound: 'No patch found with that ID' })
        );
});

module.exports = router;