// server1.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5175;

// ============================
// 🗂️  Create uploads directory
// ============================
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ============================
// ⚙️  Middleware
// ============================
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// 📁 Multer configuration
// ============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed!'), false);
  },
});

// ============================
// ✉️  Nodemailer setup
// ============================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password only!
  },
});

// ============================
// 🧪 Test Route
// ============================
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Backend server is running properly!' });
});

// ============================
// 🧾 Join Us Route
// ============================
app.post('/api/join-us', upload.single('resume'), async (req, res) => {
  console.log('=== 📥 Received /api/join-us request ===');
  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    const {
      fullName,
      email,
      relationName,
      permanentAddress,
      presentAddress,
      age,
      whatsappNumber,
      alternateNumber,
      whyChooseYou,
      howDidYouKnow,
      whyJoinChamber,
      university,
      barRegistrationNumber,
      joinType,
    } = req.body;

    // ✅ Validation
    if (
      !fullName ||
      !email ||
      !relationName ||
      !permanentAddress ||
      !presentAddress ||
      !age ||
      !whatsappNumber ||
      !whyChooseYou ||
      !howDidYouKnow ||
      !whyJoinChamber ||
      !joinType
    ) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
    }

    if (joinType === 'intern' && !university)
      return res.status(400).json({ success: false, message: 'University is required for intern applications.' });

    if (joinType === 'advocate' && !barRegistrationNumber)
      return res.status(400).json({ success: false, message: 'Bar Registration Number is required for advocate applications.' });

    if (!req.file)
      return res.status(400).json({ success: false, message: 'Resume file is required.' });

    // ✅ Email content
    const emailSubject = `New ${joinType.charAt(0).toUpperCase() + joinType.slice(1)} Application from ${fullName}`;
    const emailHTML = `
      <h2>New Application Received</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Type:</strong> ${joinType}</p>
      <p><strong>Why Choose You:</strong> ${whyChooseYou}</p>
      <p><strong>Why Join Chamber:</strong> ${whyJoinChamber}</p>
      <p><strong>How Did You Know:</strong> ${howDidYouKnow}</p>
      <p>📄 Resume attached below.</p>
    `;

    // ✅ Email sending
    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: emailSubject,
      html: emailHTML,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
          contentType: 'application/pdf',
        },
      ],
    };

    console.log('📧 Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');

    // 🧹 Delete uploaded file
    setTimeout(() => {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
        else console.log('🗑️ Uploaded file deleted');
      });
    }, 5000);

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully! We will contact you soon.',
    });
  } catch (error) {
    console.error('❌ BACKEND ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.',
    });
  }
});

// ============================
// ⚠️ Error Handling
// ============================
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: 'File too large. Max 10MB allowed.' });
  }
  if (error.message === 'Only PDF files are allowed!') {
    return res.status(400).json({ success: false, message: 'Only PDF files are allowed for upload.' });
  }
  console.error('Unhandled error:', error);
  res.status(500).json({ success: false, message: 'Something went wrong on the server.' });
});

// ============================
// 🚀 Start Server
// ============================
app.listen(port, () => {
  console.log(`🚀 Server running at: http://localhost:${port}`);
  console.log(`📧 Email sender: ${process.env.EMAIL_USER}`);
  console.log(`📥 Receiving applications at: ${process.env.RECIPIENT_EMAIL}`);
});
