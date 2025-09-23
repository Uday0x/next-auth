import { connectDb } from "@/dbConfig/connect";
import User from "@/models/userSchema";
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { Email } from "@/helpers/email";

connectDb()


export async function POST(request: NextRequest) {
    try {
        //get the data from req.body
        //email,username,password
        //find user by email
        //carete a new user
        //create a hashed passowrd
        

        const reqbody = await request.json()
        const { username , email ,password } = reqbody

        const user = await User.findOne({email}) // this is the shorthand notation {email : email } //because findone accepts objects


        if(user){
            console.log("user already exits")
             NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // const NewUser = await User.create()  if craete method is craeted then no ned to use .save  method )

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log("error after thsi rt?")
        const NewUser = await new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await NewUser.save();
        console.log(savedUser)


        await Email({email, emailType: "VERIFY", userID: savedUser._id})
         return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

     

    } catch (error :any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}