import { Processor, Process } from '@nestjs/bull';
import { JwtService } from '@nestjs/jwt';
import { Job } from 'bull';
import { AuthService } from 'src/auth/auth.service';

var nodemailer = require('nodemailer');

@Processor('emails')
export class EmailsConsumer { 
    constructor(
        private authService:AuthService){}
    
    @Process()
    async sendEmail(job: Job<unknown>) {
        console.log('SEND EMAIL')
        try {
            const token:string = this.authService.generateJWT(job.data['userEmail'])
            console.log(job.data)
            const transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                    user: "8e2d17d4b998b3",
                    pass: "f5f01d0ac3e4ca"
                    }
            });
            var mailOptions = {
                from: '"Oscar" <oscargo1917@gmail.com>',
                to: job.data['userEmail'],
                subject: 'Welcome!',
                text: 'Welcome!',
                html: `<a href=localhost:3002/confirm/${token}>Confirmation link </a>`,
            };

            await new Promise((resolve, fail) => {
                transport.sendMail(mailOptions, (error: Object, info: Object) => {
                if (error) {
                    return fail(error)
                }
                resolve(info)
                });
            })
        }
        catch(e) {
            console.log(e);
        }
        
    }
}