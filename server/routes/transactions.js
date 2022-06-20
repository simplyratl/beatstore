const router = require("express").Router();
const Transaction = require("../models/Transactions");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
    const newTransaction = new Transaction(req.body);

    try {
        const savedTransaction = await newTransaction.save();

        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json(error);
    }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedTransaction = await Transaction.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );

            res.status(200).json(updatedTransaction);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed to update transactions.");
    }
});

//GET
router.get("/", async (req, res) => {
    try {
        const beat = await Transaction.find();

        res.status(200).json(beat);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
