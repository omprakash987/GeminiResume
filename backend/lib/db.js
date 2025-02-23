
import mongoose from "mongoose";
import dotenv from 'dotenv'; 


dotenv.config();

const connectToDB = async()=>{
   try {
    const conn = await mongoose.connect(process.env.MONGODB_URL); 
    console.log("mongodb connected") 
   } catch (error) {
    console.log("mongoose Error ", error) ; 
    process.exit(1); 
   }

}

export default connectToDB; 