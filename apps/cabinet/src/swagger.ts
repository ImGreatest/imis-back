import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swagger(app: INestApplication): INestApplication {
  const config = new DocumentBuilder()
    .setTitle('API для микросервиса ИМИСа по кабинетам')
    .addBearerAuth()
    .build();
  // app.enableCors({
  //   origin: 'http://localhost:4200',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  // });
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  return app;
}
