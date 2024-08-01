const User = require("../models/user");
const {hashPassword, comparePassword} = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// controller for register route
const register = async(req,res) => {
    try {
        const {username, email, password} = req.body;
        const existingUser =  await User.findOne({email});
        if(existingUser){
            return res.json({
                success: false,
                message:"User already exists"
            });
        }
        const hashedPassword = await hashPassword(password);

        const user = await new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        res.json({
            success: true,
            message: "Registration success"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }    
}

// controller for login route
const login = async(req,res) => {
    try {
        const {email, password} = req.body;

        const user =  await User.findOne({email});
        if(!user){
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const matchedPassword = await comparePassword(password, user.password);
        if(!matchedPassword){
            return res.json({
                success: false,
                message: "Wrong Password"
            });
        }

        // jwt token creation
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{expiresIn:"1d"});        

        res.json({
            success: true,
            token: token,
            message:"User Logged In Successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }    
}

// controller to get Logged in user for protected page/routes
const getLoggedInUser = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        res.json({
            success: true,
            message: "Logged in User",
            user: user
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

module.exports = {register, login, getLoggedInUser};