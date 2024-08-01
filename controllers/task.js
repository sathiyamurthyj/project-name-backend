const Task = require("../models/task");

// controller to add a task to a project.Task can be added by manager or admin of project only.
const createTask = async(req,res)=>{
    try {
        const addTask = new Task(req.body);
        await addTask.save();
        res.json({
            success: true,
            message:"Task created successfully",
            task: addTask
        }); 
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// controller to get all tasks for a particular user as well as filters if available.
const getAllTasks = async(req,res) =>{
    try {
        Object.keys(req.body).forEach((key)=>{
            if(req.body[key]==="all"){
                delete req.body[key];
            }
        });
        const tasks = await Task.find(req.body).populate("assignedTo").populate("assignedBy").populate("project").sort({createdAt: -1});
        res.json({
            success: true,
            message:"Tasks fetched successfully",
            tasks: tasks
        }); 
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// controller to updata a task.
const updateTask = async(req,res) =>{
    try {
        await Task.findByIdAndUpdate(req.body._id, req.body);
        res.json({
            success: true,
            message:"Task updated successfully",
        }); 
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// controller to delete a task.Task can be deleted by manager or admin of project only.
const deleteTask = async(req,res) =>{
    try {
        await Task.findByIdAndDelete(req.body._id);
        res.json({
            success: true,
            message:"Task Deleted successfully",
        }); 
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

module.exports = {createTask, getAllTasks, updateTask, deleteTask};