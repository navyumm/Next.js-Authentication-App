import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        // Validation for required fields
        if (!username || !email || !password) {
            return NextResponse.json({ error: "Please provide username, email, and password" }, { status: 400 });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);
        
        const userId = savedUser._id
        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: userId });

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
