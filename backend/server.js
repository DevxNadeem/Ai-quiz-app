require('dotenv').config();


const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./libs/connectDb");

const authRoute = require("./routes/authRoute");
const testRoute = require("./routes/testRoute");
const submitRoute = require("./routes/submitRoute");
const quizRoute = require("./routes/quizRoute"); // new — GET /all, GET /information/:id

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// server.js now only wires routers — no inline handlers, no business
// logic. Was previously three routes written directly in this file
// (/api/auth/me, /api/quiz/all, /api/quiz/information/:id).
app.use("/api/auth", authRoute);
app.use("/api", testRoute);
app.use("/api/quiz", submitRoute);
app.use("/api/quiz", quizRoute);

app.use("/api", (req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id format" });
    }
    res.status(500).json({ message: "Internal server error" });
});

connectDb(process.env.MONGO_URL)
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
