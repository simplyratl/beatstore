const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const beatsRoute = require("./routes/beats");
const transactionRoute = require("./routes/transactions");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 8800;

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

//Serve static assets if in production
// app.use(express.static("app/client/build"));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "app/client/build", "index.html"));
// });

app.listen(PORT, () => {
    console.log("Backend server is running on port " + PORT + ".");
});
