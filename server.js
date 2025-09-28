const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'Adgadhnath_Mandir_Website')));

// MySQL connection setup
const dbConfig = {
    host: 'localhost',
    user: 'root',         // Change to your MySQL username
    password: 'Dabbu@123', // Change to your MySQL password
    database: 'adgadhnath_mandir'
};
let pool;

// Create connection pool at server start
(async () => {
    try {
        pool = await mysql.createPool(dbConfig);
        // Create table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100),
                phone VARCHAR(20) NOT NULL,
                city VARCHAR(100),
                subject VARCHAR(200),
                message TEXT NOT NULL,
                date DATETIME NOT NULL
            )
        `);
        console.log('Connected to MySQL and ensured contacts table exists');
    } catch (err) {
        console.error('MySQL connection error:', err);
    }
})();

// Contact form endpoint
app.post('/contact', async (req, res) => {
    const { name, email, phone, city, subject, message } = req.body;

    // Basic validation
    if (!name || !phone || !message) {
        return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    // Store submission in MySQL
    try {
        const contactQuery = `
            INSERT INTO contacts (name, email, phone, city, subject, message, date)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        await pool.query(contactQuery, [name, email, phone, city, subject, message]);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Database error.' });
    }

    // Configure nodemailer (update with your credentials)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adgadhnath.mandir@gmail.com', // Replace with your email
            pass: 'Mahakaal'     // Use Gmail app password
        }
    });

    let mailOptions = {
        from: email || 'adgadhnath.mandir@gmail.com',
        to: 'adgadhnath.mandir@gmail.com',
        subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
        text: `
नाम: ${name}
ईमेल: ${email || 'N/A'}
मोबाइल: ${phone}
शहर: ${city || 'N/A'}
विषय: ${subject || 'N/A'}
संदेश: ${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Message sent and saved!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});