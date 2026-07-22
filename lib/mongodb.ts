import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error("MONGODB_URI is not defined")
}

export async function connectDB(): Promise<void> {
   try{

    if(mongoose.connection.readyState >= 1){
        return;
    }

    await mongoose.connect(MONGODB_URI!);
    console.log("mongoDb connected");
    
   }catch(error){
    console.log("mongoDb error");
    
    throw error;
   }
}