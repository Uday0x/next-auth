import mongoose from "mongoose";


export  const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL!) //exclation mark to rmove type error


        mongoose.connection.on("connecting",()=>{
            console.log("trying to connect to mongoDB")
        })

        mongoose.connection.on("disconnected",()=>{
            console.log("mongoDB disocnnected")
        })
        
    } catch (error) {
        console.error("error connecting to teh database")
    }
}