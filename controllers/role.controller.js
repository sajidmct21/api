import Role from '../models/Role.js';
import { CreateError } from '../utils/error.js';
import { CreateSuccess } from '../utils/success.js';

export const createRole = async (req,res, next)=>{
    try {
        if(req.body.role && req.body.role !== ''){
            const newRole = new Role(req.body);
            await newRole.save();
            return next(CreateSuccess(201,'Role is created'))
        }
        else{
            return res.status(400).send('Bad Request');
            // return next(CreateError(400,'Bad Request'));
        }
    } catch (error) {
        return res.status(500).send('Internal Server Error');
        // return next(CreateError(500,'Internal Server Error'));
    }
}

export const updateRole =  async (req, res, next)=>{
    try {
        const role = await Role.findById({_id:req.params.id});
        if(role){
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            );
            return next(CreateSuccess(200,'Role is updated'));
        }
        else{
            return res.status(404).send('Role is not found');
            // return next(CreateError(404,'Role is not found'));
        }        
    } catch (error) {
        return res.status(500).send('Internal Server Error');
        // return next(CreateError(500,'Internal Server Error'));
    }
}

export const getAllRole = async (req,res,next)=>{
    try {
        const roles = await Role.find({});
        // return res.status(200).send(roles);
        return next(CreateSuccess(200,'Roles in database',roles));
    } catch (error) {
        return res.send(500).send('Internal Server Error');
        // return next(CreateError(500,'Internal Server Error'));
    }
}

export const deleteRole = async (req, res, next)=>{
    try {
        const rollId = req.params.id;
    const role = await Role.findById(rollId);
    if(role){
        await Role.findByIdAndDelete(rollId);
        // return res.status(200).send('Role is deleted')
        return next(CreateSuccess(200,'Role is deleted'))
    }
    else{
        return res.status(404).send('Role is not found');
    }        
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}