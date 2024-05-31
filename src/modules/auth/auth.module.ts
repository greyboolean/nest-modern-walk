import { Module, Scope } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ApiModule } from '../api/api.module';
import { UsersModule } from '../users/users.module';
import { JwtConfigModule } from '../jwt-config/jwt-config.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [ApiModule, UsersModule, JwtConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      scope: Scope.REQUEST,
      durable: true,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      scope: Scope.REQUEST,
      durable: true,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
