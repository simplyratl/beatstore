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
router.get('/', async (req, res) => {
    try {
        const beats = await Beat.find();

        res.status(200).json(beats);
    } catch (error) {
        res.status(500).json(error);
    }
});

//DOWNLOAD
router.get('/download/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            res.download(
                'https://firebasestorage.googleapis.com/v0/b/beatstore-a7a21.appspot.com/o/items%2Frattle_-_counting_167_Bm_(24kgoldn_guitar_sad).mp3-(mp3_tagged)4e4b742f-c068-4a01-b0d8-1aa00bddb077?alt=media&token=fa2b4deb-309a-4868-a47d-6a52ef249b6f'
            );

            res.status(200).json();
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

module.exports = router;
