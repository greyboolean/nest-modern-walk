import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './modules/prisma/aggregate-by-tenant-context-id.strategy';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // register aggregation by tenant
  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());

  // validation
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Modern Walk')
    .setDescription('The Nest-Clerk API description')
    .setVersion('1.0')
    .addTag('modern-walk')
    .addBearerAuth()
    .build();
  // const options = { include: [UsersModule] };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
