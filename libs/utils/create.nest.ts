import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { winstonModuleOptions } from 'logger/logger';
import { WinstonModule } from 'nest-winston';

export async function createNest(
  AppModule,
  name: string,
  swagger,
  port: number,
) {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonModuleOptions(name)),
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');
  swagger(app);

  await app.listen(port);
}
