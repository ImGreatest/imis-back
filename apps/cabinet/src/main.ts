import { swagger } from './swagger';
import { config } from '../../../config/config';
import { AppModule } from './app.module';
import { createNest } from 'libs/utils/create.nest';

async function bootstrap() {
  createNest(AppModule, 'users', swagger, +config.PortCabinet);
}

void bootstrap();
