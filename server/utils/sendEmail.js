//in this file I use nodeMailer library for sending mail to user

import nodemailer from "nodemailer";

//async await is not allowed in global scope, please use wrapper
const sendEmail = async function (email, subject, message) {
  //create reusable transporter object using default SMTP transport
try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT, 
      secure: false, //True for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  
    //sending mail with defined transport object
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL, //SENDER EMAIL
      to: email, //USER EMAIL
      subject: subject, //SUBJECT LINE
      html: message, //HTML BODY
    });

    console.log("Email on the way...")

} catch (error) {
  console.log("Error in sendEmail.js")
  console.log(error)
  console.log(error.message)
}
};

export default sendEmail;
