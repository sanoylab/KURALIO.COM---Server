const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (name, email)=>{
    sgMail.send({
        to: email,
        from:'KURALIO.ETHIOPIA@gmail.com',
        subject: 'እንኳን ወደ ቁራልየው ዌብ ሳይት በደህና መጡ!',
        html: `
        <table style="background-color: #fff;border-collapse:collapse; border: 1px;" width="90%" align="center">
        <tr>
        <td style="background-color: #373373; padding: 20px color: #fff;">
        <img src="https://kuralio-ad-pictures.s3.ca-central-1.amazonaws.com/welcome.png" width="100%"></td></tr>
        <tr>
        <td style="font-size:20px; line-height:1.5; ">
        <p><strong>ሰላምታ ከቁራልየው የቁሳቁስ ማሻሻጫ ዌብ ሳይት ይድረሳችሁ</strong></p>
        </td></tr>
        <tr><td>
        <p>አሁን ኢትዮጵያ ውስጥ በማንኛውም ሰዓትና ቦታ የሚፈልጉትን ዕቃ መግዛት፤ መሸጥ፤ መለወጥ ይችላሉ። </p>
        <p>በቁራልዮ ዌብ ሳይት ላይ በነፃ ያስተዋውቁ፨</p>
        </td></tr>
        <tr><td><p>ከሰላምታ ጋር</p></td></tr>
        <tr><td><p>የቁራልዮ ዴቨሮፐር</p></td></tr>
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