import {
  ContextIdFactory,
  HttpAdapterHost,
  NestFactory,
  Reflector,
} from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './modules/prisma/aggregate-by-tenant-context-id.strategy';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // register aggregation by tenant
  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());

  // validation
  app.useGlobalPipes(new ValidationPipe());

  // serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

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
