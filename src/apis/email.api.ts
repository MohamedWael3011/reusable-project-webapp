import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(
  recipient: string,
  submissionId: number,
  status: string
) {
  const email = process.env.OUTLOOK_EMAIL;
  const password = process.env.OUTLOOK_PASSWORD;

  if (!email || !password) {
    console.error("Email or password not set in the environment variables.");
    return;
  }

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
      user: email,
      pass: password,
    },
  });

  // Define email options
  const mailOptions = {
    from: email, // sender address
    to: recipient, // recipient address
    subject: `Submission ${submissionId} is ${status}`, 
    html: `<p>We are informing your that your proposal with id <strong>${submissionId}</strong> has been <strong>${status}</strong>.</p>`, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
