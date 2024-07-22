import { swagger } from './swagger';
import { config } from '../../../config/config';
import { AppModule } from './app.module';
import { createNest } from 'libs/utils/create.nest';

async function bootstrap() {
  createNest(AppModule, 'rating', swagger, +config.PortRating);
}

void bootstrap();
