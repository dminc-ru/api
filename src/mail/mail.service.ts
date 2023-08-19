import { Injectable } from "@nestjs/common";

import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(email: string, activationCode: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Активация аккаунта",
      text: "",
      html: `

              <div>
                  <h1>Активируйте аккаунт</h1>
                  <a href="${activationCode}">${activationCode}</a>
              </div>
      `,
    });
  }
}
