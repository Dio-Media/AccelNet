import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export async function signup(req, res) {
    try{
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.status(400).json({success:false,message: "All fields are required"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message: "Invalid email format"});
        }

        if(password.length < 6){
            return res.status(400).json({success:false,message: "Password must be at least 6 characters long"});
        }

        const existingingUserByEmail = await User.findOne({email:email}); 
        if(existingingUserByEmail){
            return res.status(400).json({success:false,message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingingUserByUsername = await User.findOne({username:username}); 
        if(existingingUserByUsername){
            return res.status(400).json({success:false,message: "Username already exists"});
        }

        const PROFILE_PIC = [];
        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const newUser = new User({
            email,
            password : hashedPassword,
            username,
            image
        });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({success:true,
            user:{ ...newUser._doc,
            password: "",}
        });
    } catch (error) {
        console.error("Error in signup controller", error.message);
        res.status(500).json({success:false,message: "Internal Server Error"});
    }
}

export async function login(req, res) {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message: "All fields are required"});
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({success:false,message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message: "Invalid credentials"});
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({success:true,
            user:{ ...user._doc,
            password: "",}
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({success:false,message: "Internal Server Error"});
    }
}

export async function logout(req, res) {
    try{
        res.clearCookie("jwt-demo");
        res.status(200).json({success:true,message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({success:false,message: "Internal Server Error"});
    }
}