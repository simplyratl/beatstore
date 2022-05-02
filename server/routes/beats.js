const router = require('express').Router();
const Beat = require('../models/Beat');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');

//CREATE
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newBeat = new Beat(req.body);

        try {
            const savedBeat = await newBeat.save();

            res.status(201).json(savedBeat);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed to add beats.');
    }
});

//UPDATE
router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedBeat = await Beat.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );

            res.status(200).json(updatedBeat);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed to update beats.');
    }
});

//DELETE
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Beat.findByIdAndDelete(req.params.id);

            res.status(200).json('Beat has been deleted.');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed to delete beats.');
    }
});

//GET
router.get('/find/:id', verify, async (req, res) => {
    try {
        const beat = await Beat.findById(req.params.id);

        res.status(200).json(beat);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL
router.get('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const beats = await Beat.find();

            res.status(200).json(beats);
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

module.exports = router;
