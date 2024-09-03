import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seedModule = app.select(SeedModule);
  const seedService = seedModule.get<SeedService>(SeedService);
  await seedService.seed()
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  (app as any).set('etag', false);
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
  await app.listen(3000);
}


bootstrap();


