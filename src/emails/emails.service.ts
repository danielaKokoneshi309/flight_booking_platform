import { BadRequestException, Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendBookingApprovalEmail(
    to: string,
    bookingId: number,
    isApproved: boolean,
    pdfBuffer?:Buffer
  ): Promise<void> {
    const subject = isApproved==true ? 'Your Booking is Approved!' : 'Your Booking is Rejected';
    const text = isApproved
      ? `Your booking with ID ${bookingId} has been approved.`
      : `Your booking with ID ${bookingId} has been rejected.`;

    const html = isApproved
      ? `<p>Your booking with ID ${bookingId} has been approved.</p>
<p>You can find your ticket attached to this email.</p>`
      : `<p>Your booking with ID ${bookingId} has been rejected.</p>`;

    const msg: sgMail.MailDataRequired = {
      to,
      from: 'daniela.kokoneshi@softup.co',
      subject,
      text,
      html,
      attachments:isApproved==true &&  pdfBuffer ? [
        {
          content: pdfBuffer.toString('base64'), 
          filename: 'ticket.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ] : [],
    };
   
 
    try {
        await sgMail.send(msg);
      } catch (error) {
       
       throw new BadRequestException ('Failed to send email', error.response?.body || error.message);
       
      }
  }
}
