import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";


export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !! DB HOST`);
    } catch (error) {
        console.error(" MONGODB connection FAILED : ", error);
        process.exit(1)
    }
}



