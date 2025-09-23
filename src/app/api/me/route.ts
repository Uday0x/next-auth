import { connectDb } from "@/dbConfig/connect";
import { getDataToken } from "@/helpers/getDataToken";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";


connectDb()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataToken(request)
        const user = await User.findOne({
            _id:userId
        }).select("-password")
        console.log("user in me route",user)

        return NextResponse.json({
            message:"data sent",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json("error getting user data",error)
    }
}