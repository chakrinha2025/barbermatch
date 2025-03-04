import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Configurar validação global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // Configurar CORS
  app.enableCors();
  
  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('BarberMatch API')
    .setDescription('API para o aplicativo BarberMatch')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Configurar prefixo global para rotas
  app.setGlobalPrefix('api');
  
  // Obter porta do arquivo de configuração
  const port = configService.get<number>('PORT', 3000);
  
  await app.listen(port);
  console.log(`Servidor rodando na porta ${port}`);
}

bootstrap(); 