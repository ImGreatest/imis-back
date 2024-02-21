import { NestFactory } from '@nestjs/core';
import { swagger } from './swagger';
import { config } from '../../../config/config';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonModuleOptions } from '../../../logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonModuleOptions),
  });

  app.setGlobalPrefix('api');
  swagger(app);

  await app.listen(config.PortCabinet);
}

void bootstrap();
