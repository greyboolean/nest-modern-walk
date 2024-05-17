import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ProductsModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
