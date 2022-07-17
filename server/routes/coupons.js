const router = require("express").Router();
const Coupon = require("../models/Coupon");
const verify = require("../verifyToken");

//GET COUPON
router.get("/:title", verify, async (req, res) => {
    try {
        const coupon = await Coupon.find({ title: req.params.title });

        if (!coupon) return res.status(404).json({ msg: "Coupon not found." });

        return res.status(200).json(coupon);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
