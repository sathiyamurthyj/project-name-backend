const Project = require("../models/project");
const User = require("../models/user");

// controller to add a new project.User creating project will be manager of project.
const addNewProject = async (req, res)=> {
    try {
        const project = new Project(req.body);
        await project.save();
        res.json({
            success: true,
            project: project,
            message:"Project created successfully"
        })
    } catch (error) {
        res.json({
            sucess: false,
            message: error.message
        })
    }
};

// controller to get all projects created by logged user
const getAllProjects = async (req, res)=> {
    try {
        // const {filters} = req.body;
        const projects = await Project.find({manager:req.body.manager}).sort({createdAt: -1});
        res.json({
            success: true,
            projects: projects
        });
    } catch (error) {
        res.json({
            sucess: false,
            message: error.message
        })
    }
};

// controller to get all projects user is being added as member
const getProjectsByUser = async (req, res)=> {
    try {
        const userId = req.body.userId;
        const projects = await Project.find({"members.user": userId}).sort({createdAt: -1}).populate("manager");
        res.json({
            success: true,
            projects: projects
        });
    } catch (error) {
        res.json({
            sucess: false,
            message: error.message
        })
    }
};

// controller to edit a project.Edit permision is for manager of project only.
const editProject = async(req,res)=> {
    try {
        await Project.findByIdAndUpdate(req.body._id, req.body);
        res.json({
            success: true,
            message: "Project Updated Successfully"
        });
    } catch (error) {
        res.json({
            error: error.message,
            success: false
        })
    }
};

// controller to delete a project.Delete permision is for manager of project only.
const deleteProject = async(req,res)=> {
    try {
        await Project.findByIdAndDelete(req.body._id);
        res.json({
            success: true,
            message: "Project Deleted Successfully"
        });
    } catch (error) {
        res.json({
            error: error.message,
            success: false
        })
    }
};

// controller to get project by project id.
const getProjectById = async(req,res)=> {
    try {
        const project = await Project.findById(req.body._id).populate("manager").populate("members.user");
        res.json({
            success: true,
            project: project
        });
    } catch (error) {
        res.json({
            error: error.message,
            success: false
        })
    }
};

// controller to add a member to a project.Member can be added by manager or admin of project only.
const addMember = async(req,res)=>{
    try {
        const {email, role, projectId} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success: false,
                message:"User Not Found"
            })
        }

        await Project.findByIdAndUpdate(projectId,{
            $push:{
                members:{
                    user: user._id,
                    role
                }
            }
        });
        res.json({
            success: true,
            message: "User added successfully to project"
        });
    } catch (error) {
        res.json({
            error: error.message,
            success: false
        })
    }
};

// controller to delete a member to a project.Member can be deleted by manager or admin of project only.
const deleteMember = async(req,res)=>{
    try {
        const {memberId, projectId} = req.body;
        const project = await Project.findById(projectId);
        project.members.pull(memberId);
        await project.save();
        res.json({
            success: true,
            message:"Member removed successfully"
        });
    } catch (error) {
        res.json({
            error: error.message,
            success: false
        })
    }
}



module.exports = {addNewProject, getAllProjects, editProject, deleteProject, getProjectsByUser, getProjectById, addMember, deleteMember};