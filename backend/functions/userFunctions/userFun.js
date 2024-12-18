const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");

// dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.Email_URL,
        pass: process.env.Email_pass
    }
});

const sendRegisterationEmail = (userEmail) => {
    const mailOptions = {
        from: process.env.Email_URL,
        to: userEmail,
        subject: 'Registration Successful', 
        text: 'Welcome to Meds24! Your registration was successful.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("Error sending mail", error);
        } else {
            console.log("Email sent", info.response);
        }
    });
};

module.exports = { sendRegisterationEmail };