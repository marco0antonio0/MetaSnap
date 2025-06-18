import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // 🔧 Configuração Swagger
  const config = new DocumentBuilder()
    .setTitle('MetaSnap API')
    .setDescription('API para gerar imagens de preview de sites (screenshots)')
    .setVersion('1.0')
    .addTag('screenshot')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
