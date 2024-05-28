import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { CartsModule } from './modules/carts/carts.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApiModule } from './modules/api/api.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { DataSourcesModule } from './modules/data-sources/data-sources.module';
import { TenantMiddleware } from './middlewares/tenant.middleware';

@Module({
  imports: [
    ProductsModule,
    CartsModule,
    UsersModule,
    AuthModule,
    ApiModule,
    PrismaModule,
    TenantsModule,
    DataSourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
