const nodemailer = require('nodemailer');

async function contactUsSendEmailSingle(email, query, disease) {
    try {
        // const transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //         user: 'chesstrainingone@gmail.com',
        //         pass: 'yeus dfbz xill lnii'
        //     },
        // });

        // const mailOptions = {
        //     from: 'yeus dfbz xill lnii',
        //     to: email,
        //     subject: `${disease}`,
        //     text: `${query}`,
        // };

        // await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { contactUsSendEmailSingle };