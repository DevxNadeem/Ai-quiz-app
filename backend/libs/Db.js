const mongoose = require("mongoose");

async function connectDb(URL) {
    try {
        await mongoose.connect(URL);
        console.log("DB Connected");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = connectDb;