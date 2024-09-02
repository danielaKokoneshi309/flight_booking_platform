import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions} from 'pdfmake'
import { Booking } from 'src/bookings/booking.entity';
import { BookingDto } from 'src/bookings/dto/booking.dto';

@Injectable()
export class PdfService {
  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  async generateBookingPdf(bookingData: BookingDto): Promise<Buffer> {
    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Booking Receipt', style: 'header' },
        { text: `Booking ID: ${bookingData.id}`, style: 'subheader' },
        { text: `Flight: ${bookingData.flightId}`, style: 'subheader' },
        { text: `User: ${bookingData.userId}`, style: 'subheader' },
        { text: `Seat: ${bookingData.seatNumber}`, style: 'subheader' },
        { text: `Preferred Seat: ${bookingData.preferredSeat ? 'Yes' : 'No'}`, style: 'subheader' },
        { text: `Extra Cost: $${bookingData.extraCost}`, style: 'subheader' },
        { text: `Booking Status: ${bookingData.isApproved ? 'Approved' : 'Rejected'}`, style: 'subheader' },
        { text: `Date: ${new Date().toLocaleDateString()}`, style: 'subheader' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          margin: [0, 10, 0, 5],
        },
      },
    };

    return new Promise((resolve, reject) => {
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      pdfDocGenerator.getBuffer((buffer) => {
        resolve(Buffer.from(buffer));
      });
    });
  }
}
