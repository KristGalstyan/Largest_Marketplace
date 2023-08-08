import nodemailer from 'nodemailer'

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: 'kapan.shopping2023@gmail.com',
        pass: 'bewpxhicdcjyeija'
      }
    })
  }

  async sendActivationMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: 'kapan.shopping2023@gmail.com',
        to,
        subject: 'Account activation for the Largest Marketplace',
        text: '',
        html: `
    <div style=' max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;'>
           <div style='text-align: center;
           margin-bottom: 20px;'>
            <h2>Well met!</h2>
             </div>
           <p>To activate your account, please click on the button below:</p>
        <a style=' display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;' href=${link}>Activate account</a>
        <p>If the button doesn't work, copy and paste this link into your browser's address bar:<br> <a href=${link}>${link}</a></p>
        <p>Sincerely, <br>Your team</p>
    </div>  `
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sendCodeToChangePass(to, code) {
    try {
      await this.transporter.sendMail({
        from: 'kapan.shopping2023@gmail.com',
        to,
        subject: 'Password recovery on the largest market',
        text: '',
        html: `
    <div style='max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;'>
          <div style='text-align: center;
           margin-bottom: 20px;'>
            <h2>Password recovery</h2>
             </div>
           <p>To restore access to Largest Marketplace, use this code bellow:</p>

        <div style='border:5px solid red; 
        border-radius: 5px;'>${code}</div>

        <p>Sincerely, <br>Your team</p>
    </div>  `
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default new MailService()
