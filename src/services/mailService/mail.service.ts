import { injectable } from "tsyringe";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

@injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true para puerto 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendTwoFactorCode(email: string, code: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Tu Código de Verificación',
        html: this.getEmailTemplate(code),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Código 2FA enviado a ${email}: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('Error enviando correo:', error);
      return false;
    }
  }

  async sendRecoverUsername(email: string, username: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Tu usuario',
        html: this.getEmailTemplateRecoverUsername(username),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Username enviado a ${email}: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('Error enviando correo:', error);
      return false;
    }
  }

  private getEmailTemplate(code: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
          .code { font-size: 24px; font-weight: bold; letter-spacing: 2px; padding: 10px; background: #f5f5f5; display: inline-block; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Tu Código de Verificación</h2>
          <p>Utiliza el siguiente código para completar tu autenticación de dos factores:</p>
          
          <div class="code">${code}</div>
          
          <p>Este código expirará en 10 minutos.</p>
          
          <div class="footer">
            <p>Si no solicitaste este código, por favor ignora este mensaje.</p>
            <p>&copy; ${new Date().getFullYear()} Tu App de Autenticación</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getEmailTemplateRecoverUsername(username : string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
          .code { font-size: 24px; font-weight: bold; letter-spacing: 2px; padding: 10px; background: #f5f5f5; display: inline-block; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Recuperación de usuario</h2>
          <p>Tu usuario de inicio de sesión en la aplicación es el siguiente:</p>
          
          <div class="code">${username}</div>
          
          <p>StockWise.</p>
          
          <div class="footer">
            <p>Si no solicitaste este paso de recuperación, por favor ignora este mensaje.</p>
            <p>&copy; ${new Date().getFullYear()} Tu App de Autenticación</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}