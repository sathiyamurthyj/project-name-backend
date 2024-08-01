const mongoose = require("mongoose");
// sub schema for members
const subSchema = new mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            required: true
        }
});

// project schema
const projectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "active"
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members:[subSchema]
},{timestamps: true});

module.exports = mongoose.model("Project", projectSchema);