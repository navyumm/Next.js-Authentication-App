import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest } from "next/server";


connectDB()

export async function POST(request: NextRequest) {
  try {
    
    const reqBody = await request.json()
    const { email, password } = reqBody
    // validation
    console.log(reqBody);

    const user = await User.findOne({email})

    if (!user) {
      
    }
    
  } catch (error) {
    
  }
}