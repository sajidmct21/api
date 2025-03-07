import Role from "../models/Role.js";
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

// Register as a user 
export const registerAdmin = async (req, res, next)=>{
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            isAdmin:true,
            roles:role
        });
        await newUser.save();
        return next(CreateSuccess(200,'User as admin is Registered Successfully'));
        
    } catch (error) {
        // res.status(500).send('Internal Server Error');
        return next(CreateError(500,'Internal Server Error'));
    }
    
}

// Register as a admin 
export const register = async (req, res, next)=>{
    try {
        const role = await Role.find({role:'User'});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            roles:role
        });
        await newUser.save();
        return next(CreateSuccess(200,'User Registered Successfully'));
        
    } catch (error) {
        // res.status(500).send('Internal Server Error');
        return next(CreateError(500,'Internal Server Error'));
    }
    
}

export const login = async (req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        .populate('roles','role');
        const {roles} = user; 
        if(!user){
            // return res.status(404).send('User not found');
            return next(CreateError(400,'User not found'));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect){
            // return res.status(400).send('Password is incorrect');
            return next(CreateError(400,'Password is incorrect'));
        }
        const token = jwt.sign(
            {id:user._id,isAdmin:user.isAdmin,roles:roles},
            process.env.JWT_SECRET
        )
        // return next(CreateSuccess(200,'Login Success'));
        res.cookie('access_token', token, {httpOnly:true})
        .status(200)
        .json({
            status:200,
            message:'Login Success',
            data:user
        })
    } catch (error) {
        // return res.status(500).send('Something is wrong on Server');
        return next(CreateError(500,'Internal Server Error'));
    }
}