import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, password, first_name, last_name } = req.body;

        // Validation
        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: email, password, first_name, last_name"
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Create new user
        const newUser = await User.create({
            email,
            password,
            first_name,
            last_name
        });

        // Generate token and set cookie
        generateTokenAndSetCookie(newUser.user_id, res);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                userId: newUser.user_id,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name
            }
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Check password
        const isPasswordCorrect = await User.comparePassword(password, user.password_hash);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(user.user_id, res);

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                userId: user.user_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("accelnet_token");
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Verify token and get current user
export async function verifyToken(req, res) {
    try {
        // req.user is set by the protectRoute middleware
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: {
                userId: user.user_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error in verifyToken controller:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}