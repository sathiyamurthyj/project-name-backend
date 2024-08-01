const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);