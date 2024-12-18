const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`CONNECTED TO MONGODB`);
        })
        .catch((error) => {
            console.log(error);
            console.log(`ERROR While Connecting to MongoDB`)
        });

    } catch (error) {
        console.log(`SERVER SIDE ISSUE While Connecting to MongoDB`)
    }
    
};

module.exports = connectDB;