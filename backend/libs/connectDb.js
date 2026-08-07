const mongoose = require("mongoose");

const connectDb = async (mongoUrl) => {
    if (!mongoUrl) {
        throw new Error("MONGO_URL is not set in your .env file");
    }
    return mongoose.connect(mongoUrl);
};

module.exports = connectDb;