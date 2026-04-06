import nodemailer from "nodemailer"

export async function sendEmail(to, subject, text) {

    console.log(to,subject,text);
    
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "garima.bajaj126@gmail.com",
      pass: "obuj fkyv vapn skpb"
    }
  })

  await transporter.sendMail({
    from: "garima.bajaj126@gmail.com",
    to,
    subject,
    text
  })
}