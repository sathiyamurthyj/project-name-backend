const mongoose = require("mongoose");

// task schema
const taskSchema = new mongoose.Schema({
    taskName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default:"pending"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    assignedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },    
},{timestamps: true});

module.exports = mongoose.model("Task", taskSchema);