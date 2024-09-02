import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';


@Controller('emails')
export class EmailsController {
    constructor(private mailService: MailerService){
        

        }
        @Get('plain-text-email')
       async plainTextEmail(@Query('toemail')toemail){
        await this.mailService.sendMail({
            to:toemail,
     from:'daniela.kokoneshi@softup.co',
subject:"Plain text",
text:'Welcome'
        });
        return 'success';

    }
}
