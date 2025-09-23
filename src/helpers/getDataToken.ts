import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataToken =async (request:NextRequest)=>{
 try {
     const token = request.cookies.get("token")?.value || "";
     console.log("token",token)
     const extractedData:any = jwt.verify(token,process.env.TOKEN_SECRET!)
     console.log(process.env.TOKEN_SECRET)
     console.log(typeof(process.env.TOKEN_SECRET!))
      //jwt.verify returns string
      console.log("extracted data",extractedData.id)
      return extractedData.data.id ; //id is key value pair 
    //   console.log(extractedData.id)
 } catch (error :any) {
      throw new Error(error.message);
 }
}