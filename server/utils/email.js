const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (options) => {
    try {
        await transporter.sendMail({
            from: '"Laptomania" <no-reply>',
            to: options.email,
            subject: options.subject,
            html: options.html
        });
    } catch (err){
        console.log('Error', err)
    }
};

module.exports = sendEmail;