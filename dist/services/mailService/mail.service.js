"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const tsyringe_1 = require("tsyringe");
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
let MailService = class MailService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true para puerto 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    async sendTwoFactorCode(email, code) {
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
        }
        catch (error) {
            console.error('Error enviando correo:', error);
            return false;
        }
    }
    async sendRecoverUsername(email, username) {
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
        }
        catch (error) {
            console.error('Error enviando correo:', error);
            return false;
        }
    }
    getEmailTemplate(code) {
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
    getEmailTemplateRecoverUsername(username) {
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
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map