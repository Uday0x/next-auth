import { connectDb } from "@/dbConfig/connect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



connectDb() //run the database
export  async function POST(request: Request) {

    try {
        const reqbody = await request.json();
        const { email ,password} = reqbody;


        if(!email || !password){
            return NextResponse.json({
                message:"incomplte credentails",
            })
        }

        const user = await User.findOne({
            email
        })

        if(!user){
            return NextResponse.json({
                message:"User not found by following emailId"
            })
        }

        //now compare whether the passowrd is correct or not

        const isPassowrdcrt = await bcrypt.compare(password,user.password)
        if(!isPassowrdcrt){
            return NextResponse.json({
                message:"wrong passowrd or incoorect match of passowrd"
            })
        }


        const data={
            username:user.username,
            email:user.email,
            id:user._id
        }
        
        const token = jwt.sign({
            data
        },process.env.TOKEN_SECRET!,{
            expiresIn:"1d"
        }
    )

    
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error:any) {
         return NextResponse.json({error: error.message}, {status: 500})
    }

}