const nodemailer = require('nodemailer');

const sendEmail = async(data)=>{
    try {
        const transport = nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:'azeembashir.33@gmail.com',
                pass:process.env.APP_PASSWORD
            }

        })

        const stringOtp = data.otp.toString();
        const mailOption = {
            from: 'azeembashir.33@gmail.com',
            to:data.email,
            subject: 'your password otp is',
            text:stringOtp
        }
        const result = await transport.sendMail(mailOption);
        return result;
    } catch (error) {
        console.log(error);
        
    }
};

module.exports = sendEmail;