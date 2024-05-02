import { swagger } from './swagger';
import { config } from 'config/config';
import { AppModule } from './app.module';
import { createNest } from 'libs/utils/create.nest';
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  await createNest(AppModule, 'users', swagger, +config.PortCabinet);
  // const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // await app.listen(3000);
}

void bootstrap();
