import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ApiModule } from './api/api.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, ApiModule, CartsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
