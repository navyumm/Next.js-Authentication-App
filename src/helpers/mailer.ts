import nodemailer from 'nodemailer';
import User from "@/models/user.model";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // const hashedToken = "abc123";
        console.log("MAIL", userId);
        console.log("EMAIL TYPE", emailType);
        console.log(typeof emailType);
        
        
        if (emailType === "VERIFY") {
            console.log("VERIFY SECTION");
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,{
                    $set: {
                        verifyToken: hashedToken, 
                        verifyTokenExpiry: new Date(Date.now() + 3600000) // Expiry in 1 Hours from now
                    }
                });
                console.log("Upadeted user for VERIFY", updatedUser);
                
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,{ 
                    $set: {
                        forgotPasswordToken: hashedToken, 
                        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)  // Expiry in 1 Hours from now
                    }
                });
        }
        console.log("Out side if else");
        
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ff4f34da8e8628",
                pass: "93731cbb8bb737"
            }
        });


        const mailOptions = {
            from: 'one@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}