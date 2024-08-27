import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';


import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    FlightsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
