const express = require("express");
const requireSignIn = require("../middlewares/auth");

// routes related to tasks

const { getAllTasks, createTask, updateTask, deleteTask } = require("../controllers/task");
const router = express.Router();

router.post("/create-task", requireSignIn, createTask);
router.post("/all-tasks", requireSignIn, getAllTasks);
router.post("/update-task", requireSignIn, updateTask);
router.post("/delete-task", requireSignIn, deleteTask);

module.exports = router;