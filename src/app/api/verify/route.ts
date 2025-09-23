import { connectDb } from "@/dbConfig/connect";
import User from "@/models/userSchema";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";



connectDb();

export async function POST (request:NextRequest){


    try {

        //one might be wondering can the data be coming in req.body we would handle that in frontend
        const reqbody = await request.json();
        const{ token } = reqbody;


        //verifying whether toke n ha sarrivied
        if(!token){
            return NextResponse.json({
                error:"Invalid token",
                status:500
            })
        }


        const user =await User.findOne({
            
            verifyToken:token,
            verifyTokenExpiry:{$gt : Date.now()} //expiry should be greater than current date
        })
        // console.log("token received",token)
        // console.log(user.verifyTokenExpiry)
        // console.log("user found by token",user)
        console.log("User in DB", await User.findOne({ verifyToken: token }));

        if(!user){
            return NextResponse.json("User not found")
        }

        user.isverified = true
        user.verifyToken = undefined,
        user.verifyTokenExpiry = undefined
        await user.save()


        return NextResponse.json({
            message:"Email verified successfully",
            success:true
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}