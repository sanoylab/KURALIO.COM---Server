const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (name, email)=>{
    sgMail.send({
        to: email,
        from:'KURALIO.ETHIOPIA@gmail.com',
        subject: 'Welcome to KURALIO!',
        html: `
        <table style="background-color: #fff;border-collapse:collapse; border: 1px;" width="80%" align="center">
        <tr><td style="background-color: #373373; padding: 20px color: #fff;"><img src="https://static.cdn.responsys.net/i2/responsysimages/kijiji/contentlibrary/campaigns/welcome/fall2018/hero_en.png" width="100%"></td></tr>
        <tr><td style="font-size:20px; line-height:1.5; "><p><strong>Hey ${name}, <br>Welcome to the Kuralio-Ethiopia community - Ethiopia's awesome online classifieds site!</strong></p></td></tr>
        <tr><td><p>You've tapped into Ethiopia's favourite place to buy, sell and swap items and services. Now that you're here, let's kick off your Kuralio experience with some helpful tips and advice.</p></td></tr>
        <tr><td><p>Kind regards,</p></td></tr>
        <tr><td><p>LiVana Team</p></td></tr>
        </table>`
    })
}

const sendCancelEmail = (name, email)=>{
    sgMail.send({
        to: email,
        from:'KURALIO.ETHIOPIA@gmail.com',
        subject: 'Goodbye '+name,
        text: `Please let us know why you left our service. Can't wait to see back again`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}