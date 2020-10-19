const nodemailer = require('nodemailer');
const fs = require('fs');
exports.sendMail = function (to, subject, content) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cskh.phuongnghiep@gmail.com',
            pass: 'thisispassword8'
        }
    });
    const mailOptions = {
        from: 'cskh.phuongnghiep@gmail.com',
        to: to,
        subject: subject,
        html: content
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    transporter.close();
}
fs.createReadStream

