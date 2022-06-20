const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
    {
        trackingID: { type: String, required: true },
        productName: { type: Array, required: true },
        customerName: { type: String, required: true },
        price: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transactions", TransactionSchema);
