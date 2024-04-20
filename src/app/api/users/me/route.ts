import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/detDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        // extract data from token
        const userId = await getDataFromToken(request);
        
        // find user by ID
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                data: null
            });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });
        
    } catch (error: any) {
        return NextResponse.json({
            message: "Login required",
            error: error.message
        }, {
            status: 500
        });
    }
}
