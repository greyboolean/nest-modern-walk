import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ProductsModule, CartsModule, UsersModule, AuthModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
