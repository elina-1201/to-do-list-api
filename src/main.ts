import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ################## Swagger setup #####################################
  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setVersion('1.0')
    .addTag('swagger')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  // ################## Swagger setup #####################################

  // ###### Validation setup ##############
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
