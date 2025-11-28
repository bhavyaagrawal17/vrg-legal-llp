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

// === Multer setup for TWO FILES: resume + coverLetter ===
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
app.post(
  "/api/join-us",
  upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "cv", maxCount: 1 }
]),
  async (req, res) => {
    try {
      const formData = req.body;
      const files = req.files || {};

      const resumeFile = files.resume ? files.resume[0] : null;
      const cvFile = files.cv ? files.cv[0] : null;


      console.log("✅ Received form data:", formData);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const subject = `New ${formData.joinType?.toUpperCase()} Application - ${formData.fullName}`;

      const textBody = `
A new ${formData.joinType} application has been submitted.

=====================================
👤 PERSONAL DETAILS
=====================================
Name: ${formData.fullName}
Email: ${formData.email}
Phone / WhatsApp: ${formData.whatsappNumber}
Alternate Number: ${formData.alternateNumber || "N/A"}

Permanent Address: ${formData.permanentAddress}
Present Address: ${formData.presentAddress}

=====================================
🎓 EDUCATION DETAILS
=====================================

${formData.joinType === "intern" ? `
University/College: ${formData.university}
Year: ${formData.year}
Semester: ${formData.semester}
` : `
Bar Registration Number: ${formData.barRegistrationNumber}
University: ${formData.advocateUniversity}
Additional Qualification: ${formData.additionalQualification || "N/A"}
`}

=====================================
💬 RESPONSES
=====================================

Why should we choose you:
${formData.whyChooseYou}

How did you get to know about us:
${formData.howDidYouKnow}

Why do you wish to join us:
${formData.whyJoinChamber}

=====================================
📄 ATTACHMENTS
=====================================

Resume: ${resumeFile ? resumeFile.originalname : "Not uploaded"}
Cover Letter: ${coverLetterFile ? coverLetterFile.originalname : "Not uploaded"}
`;

      const attachments = [];
      if (resumeFile) {
        attachments.push({
          filename: resumeFile.originalname,
          path: resumeFile.path
        });
      }
      if (coverLetterFile) {
        attachments.push({
          filename: coverLetterFile.originalname,
          path: coverLetterFile.path
        });
      }

      await transporter.sendMail({
        from: `"VRG Legal Join Us" <${process.env.EMAIL_USER}>`,
        to: process.env.TO_EMAIL,
        subject,
        text: textBody,
        attachments
      });

      // delete files
      if (resumeFile) fs.unlinkSync(resumeFile.path);
      if (coverLetterFile) fs.unlinkSync(coverLetterFile.path);

      res.json({ success: true, message: "Application received successfully!" });
    } catch (err) {
      console.error("❌ Error:", err);
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  }
);

app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    console.log("📩 Contact form data:", req.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `New Contact Message from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
`
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Contact Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
});

// === Start server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
