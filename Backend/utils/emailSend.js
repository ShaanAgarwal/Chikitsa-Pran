const nodemailer = require('nodemailer');

async function contactUsSendEmailSingle(email, query, disease) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'agarwalshaan27@gmail.com',
                pass: 'mifz bvwq pdav lkjd'
            },
        });

        const mailOptions = {
            from: 'agarwalshaan27@gmail.com',
            to: email,
            subject: `${disease}`,
            text: `${query}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { contactUsSendEmailSingle };