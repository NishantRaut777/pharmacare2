const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendRegisterationEmail } = require("../functions/userFunctions/userFun");
const { validateEmail, validatePassword } = require("../globalFunctions");


// HANDLING REGISTERATION
const registerController = async(req,res) => {
    try {
        const { email, password } = req.body;

        const isValidEmail = await validateEmail(email);
        const isValidPassword = await validatePassword(password);

        if(!isValidEmail){
            return res.status(200).send({ message: "Invalid Email", success: false });
        }

        if(!isValidPassword){
            console.log(password);
            return res.status(200).send({ message: "Invalid Password Keep Strong Password (minimum 8 maximum 15 characters)", success: false });
        }

        const existingUser = await userModel.findOne({ email: email });

        if(existingUser){
            return res.status(200).send({ message: "User Already Exists", success: false });
        }

        const currentPassword = password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(currentPassword, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();
        sendRegisterationEmail(req.body.email);
        res.status(201).send({
            message: "Registered Successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Register Controller Error : ${error.message}`,
            success: false
        });
    }
};

// HANDLING LOGIN
const loginController = async (req,res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        if(!user){
            return res.status(200).send({
                message: "User not found",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({ message: "Invalid Credentials",
            success: false
        });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { "password": password, ...rest } = user._doc;
        const finalData = {...rest, success: true, token: token};

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(finalData);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Login Controller Error: ${error.message}` });
    }
};


const logoutController = async (req, res) => {
    try {
        res.clearCookie("access_token");

        res.status(200).send({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Logout Controller Error: ${error.message}` });
    }
};

// const logoutController = async(req, res) => {
//     try {
//         console.log("INSIDE LOGOUT");
//         localStorage.removeItem("token");
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: `Logout Controller Error: ${error.message}` });
//     }
// };

// HANDLING AUTHORIZATION
const authController = async(req,res) => {
    try {
        const user = await userModel.findOne({
            _id: req.body.userId
        });
        user.password = undefined;

        if(!user){
            return res.status(200).send({
               message: "User not found",
               success: false 
            });
        } else {
            res.status(200).send({
                success: true,
                data: user
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Authorization Error",
            success: false,
            error
        });
    }
};

module.exports = { registerController, loginController, logoutController, authController };