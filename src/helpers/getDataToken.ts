import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataToken = (request:NextRequest)=>{
 try {
     const token = request.cookies.get("token")?.value || "";
     const extractedData:any = jwt.verify(token,process.env.TOKEN_SECRET!) //jwt.verify returns string
      return extractedData.id ; //id is key value pair 
 } catch (error :any) {
      throw new Error(error.message);
 }
}