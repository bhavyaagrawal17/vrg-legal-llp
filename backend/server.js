// server.js
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT ERROR:", err);
});

// === Multer setup for file uploads ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// === Route to handle form submission ===
app.post("/api/join-us", upload.single("resume"), async (req, res) => {
  try {
    const formData = req.body;
    const file = req.file;

    console.log("✅ Received form data:", formData);

    // === Setup transporter ===
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // === Build email content ===
    const subject = `New ${formData.joinType?.toUpperCase()} Application - ${formData.fullName}`;
    const textBody = `
A new ${formData.joinType} application has been submitted.

👤 Name: ${formData.fullName}
📧 Email: ${formData.email}
👪 Relation: ${formData.relationName}
🎂 Age: ${formData.age}
📞 WhatsApp: ${formData.whatsappNumber}
📞 Alternate: ${formData.alternateNumber || "N/A"}
🏠 Permanent Address: ${formData.permanentAddress}
🏠 Present Address: ${formData.presentAddress}

🎓 University/College: ${formData.university || "N/A"}
⚖️ Bar Registration No: ${formData.barRegistrationNumber || "N/A"}

💬 Why should we choose you:
${formData.whyChooseYou}

💡 How did you know about chamber:
${formData.howDidYouKnow}

✨ Why do you wish to join:
${formData.whyJoinChamber}
    `;

    // === Send email ===
    const mailOptions = {
      from: `"VRG Legal Join Us" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject,
      text: textBody,
      attachments: file
        ? [
            {
              filename: file.originalname,
              path: file.path,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);
    console.log("📨 Email sent successfully!");

    // Delete uploaded file after sending
    if (file) fs.unlinkSync(file.path);

    res.json({ success: true, message: "Application received successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// === Contact route (no file upload) ===
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body || {};

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Setup transporter (reuses your existing transporter config)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const subject = `New Contact Request from ${firstName} ${lastName}`;
    const textBody = `
New contact request:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `;

    const mailOptions = {
      from: `"VRG Legal Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject,
      text: textBody,
    };

    await transporter.sendMail(mailOptions);
    console.log("📨 Contact email sent");

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Contact route error:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});


// === Start server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
