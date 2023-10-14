//in this file I use nodeMailer library for sending mail to user

import nodemailer from "nodemailer";

//async await is not allowed in global scope, please use wrapper
const sendEmail = async function (email, subject, message) {
  //create reusable transporter object using default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT, // TODO
    //secure: false, //True for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
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
};

export default sendEmail;
