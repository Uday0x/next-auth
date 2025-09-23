import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
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
        type:String
    },
    verifyTokenExpiry:{
        type:Date
    }
});

const User = mongoose.models.users || mongoose.model("users",userSchema) //mongoose.models is object in whcih previously defined models are kept
//since next js runs on edge this functionality is required no matter wt

export default User