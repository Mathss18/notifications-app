import nodemailer from 'nodemailer'

export class EmailService {
    private host: string
    private port: string
    private user: string
    private email: string
    private password: string
    private transporter: any

    constructor({ host, port, user, email, password }: any) {
        this.host = host
        this.port = port
        this.user = user
        this.email = email
        this.password = password
        this.createTransporter()
    }
    public async sendEmail(from: string, senderEmails: string, subject: string, text: string, html: string) {
        let info = await this.transporter.sendMail({
            from: `"${from}" <${this.email}>`, // sender address
            to: senderEmails, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });

        return info;
    }

    private createTransporter() {
        this.transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: false, // true for 465, false for other ports
            auth: {
                user: this.user, // generated ethereal user
                pass: this.password, // generated ethereal password
            },
        } as any);
    }
}