const mongoose = require("mongoose");

const CouponsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    percent: { type: String, required: true },
});

module.exports = mongoose.model("Coupons", CouponsSchema);
