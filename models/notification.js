const mongoose = require("mongoose");

// notification schema
const notificationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    onClick:{
        type: String,
        required: true
    },
    read:{
        type: Boolean,
        default:false
    }
},{timestamps: true});

module.exports = mongoose.model("Notification", notificationSchema);