import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import User from "@/models/userSchema.js"
//create sendEmail function kind of a callback ewhich has email,mailType,userId as parameters


export const Email = async({email,emailType,userID}:any)=>{
  console.log(email,emailType)
 console.log(userID)

  try {
    const hashedToken = await bcrypt.hash(userID.toString(),10)
    console.log(userID)
  
    if(emailType == "VERIFY"){
        await User.findByIdAndUpdate(userID,{
          verifyToken:hashedToken,
          verifyTokenExpiry:Date.now() + 3600000
        })
    }else if(emailType == "RESET"){
      await User.findByIdAndUpdate(userID,{
         forgotPasswordtoken:hashedToken,
          forgotPasswordtokenExpiry:Date.now() + 3600000
      })
    }
  
  
    //craete a construcctor file
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "4a7174422dcdc5",
      pass: "09d711cc1d3d34",
    },
  });
  
  
  const mailOptions = {
      from:"uday@gamil.com",
      to:email,
      subject:emailType == "VERIFY" ? "VERIFY YOUR EMAIL" :"RESET YOUR EMAIL",
      html:`<p> click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> to ${emailType == "verify"? "verify your email" : "reset your passowrd"}  or copy paste the below link ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
  }
  
   const mailResponse =await transporter.sendMail(mailOptions)
   return mailResponse
  } catch (error) {
      console.log("error sending the mail plz check",error)
  }
}