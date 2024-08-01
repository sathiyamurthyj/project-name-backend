const mongoose = require("mongoose");

// DB connection and config
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB");
    } catch (error) {
        console.error("DB Connection Error", error.message);
    }
}

module.exports = connectDB;