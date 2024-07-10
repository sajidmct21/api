import mongoose  from "mongoose";

const RoleSchema = mongoose.Schema(
    {
        role:{
            type:String,
            required:true
        }
    },
    {
        timestapms:true
    }
);

export default mongoose.model('Role', RoleSchema)