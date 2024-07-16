import User from "../models/User.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";

export const getAllUsers = async (req, res, next)=>{
    try {
         const users = await User.find({});
         if(!users){
            return next(CreateError(404, 'Not Found'));
         }
         else{
            return next(CreateSuccess(200,'All Users', users))
         }
    } catch (error) {
        next(CreateError(500,'Internel Server Error'))
    }
}

export const getUserByID = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(CreateError(404, 'Not Fond'));
        }
        else{
            return next(CreateSuccess(200,'Single User', user));
        }
        
    } catch (error) {
        next(CreateError(500,'Internel Server Error'))
    }
}