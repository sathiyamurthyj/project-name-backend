const express = require("express");
const requireSignIn = require("../middlewares/auth");
const {addNewProject, getAllProjects, editProject, deleteProject, getProjectsByUser, getProjectById, addMember, deleteMember} = require("../controllers/project")

const router = express.Router();

// routes related to projects and member

router.post("/create-project", requireSignIn, addNewProject);

router.post("/all-projects", requireSignIn, getAllProjects);

router.post("/user-projects", requireSignIn, getProjectsByUser);

router.post("/project-by-id",requireSignIn, getProjectById);

router.post("/edit-project", requireSignIn, editProject);

router.post("/delete-project", requireSignIn, deleteProject);

// members
router.post("/add-member", requireSignIn, addMember);
router.post("/delete-member", requireSignIn, deleteMember);

module.exports = router;