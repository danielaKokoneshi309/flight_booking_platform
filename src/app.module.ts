import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserMiddleware } from './users/middleware/current-user.middleware';
import { PlanesModule } from './planes/planes.module';
import { BookingsModule } from './bookings/bookings.module';
import { EmailsModule } from './emails/emails.module';
import { PdfService } from './pdf/pdf.service';
import { PdfModule } from './pdf/pdf.module';
import { MailerModule } from '@nestjs-modules/mailer';
const cookieSession= require('cookie-session')


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:`.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    UsersModule,
    FlightsModule,
    PlanesModule,
    BookingsModule,
    EmailsModule,
    PdfModule
  ],
  controllers: [AppController],
  providers: [AppService, PdfService],
})
export class AppModule {

  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
        CurrentUserMiddleware
      )
      .forRoutes('*');
  }
}
