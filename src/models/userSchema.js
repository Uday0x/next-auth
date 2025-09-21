import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    passoword:{
        type:String,
        required:true
    },
    isverified:{
        type:Boolean,
        default:false
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordtoken:{
        type:String,

    },
    forgotPasswordtokenExpiry:{
        type:Date
    },
    verifyToken:{
        type:str
    },
    verifyTokenExpiry:{
        type:Date
    }
});

const User = mongoose.model.users || mongoose.model("users",userSchema) 
//since next js runs on edge this functionality is required no matter wt

export default User