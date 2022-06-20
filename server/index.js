const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const beatsRoute = require("./routes/beats");
const transactionRoute = require("./routes/transactions");
const cors = require("cors");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connection Successfull!"))
    .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/beat", beatsRoute);
app.use("/transaction", transactionRoute);

app.listen(8800, () => {
    console.log("Backend server is running.");
});
