import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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
  SwaggerModule.setup('api', app, documentFactory);
  // ################## Swagger setup #####################################

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
