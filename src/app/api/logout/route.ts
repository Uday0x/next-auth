import { connectDb } from "@/dbConfig/connect";
import { NextRequest, NextResponse } from "next/server";


connectDb();


export async function POST (request:NextRequest){
    try {
        const response = NextResponse.json({
            message:"Logout successful",
            success:true
        })


         response.cookies.set("token", "", 
        { httpOnly: true, expires: new Date(0) 
        }); //important to give this parameters as well
        return response;
    } catch (error :any ) {
         return NextResponse.json({ error: error.message }, { status: 500 });
    }
}