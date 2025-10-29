// server/server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- Nodemailer Setup ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // your Gmail
    pass: process.env.MAIL_PASSWORD, // your App Password
  },
});

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// --- API Endpoint ---
app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  console.log(req.body);


  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const mailOptions = {
    from: `"VRG Legal LLP" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_RECEIVER || process.env.MAIL_USER, // your receiving address
    subject: `New Contact from ${firstName} ${lastName}`,
    html: `
      <h2>New Inquiry from ${firstName} ${lastName}</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message. Try again later." });
  }
});

const PORT = process.env.PORT || 5000;

console.log("👉 Starting server setup...");

try {
 app.listen(PORT, "127.0.0.1", () => console.log(`Server running on port ${PORT}`));


} catch (err) {
  console.error("❌ Server failed to start:", err);
}

