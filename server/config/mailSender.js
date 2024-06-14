const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from: 'Central Club Administration',
            to: email,
            subject: title,
            html: body
        })

        return info;
    }
    catch(error){
        console.log(error)
        // console.log(error.message);
    }
}

module.exports = mailSender;