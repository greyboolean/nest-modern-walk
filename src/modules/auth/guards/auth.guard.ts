import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { ContextIdFactory, ModuleRef, Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    // TODO
    // reflector gets undefined if we inject userService directly while keeping AuthGuard default scoped, because usersService is request scoped
    private usersService: UsersService,
    private reflector: Reflector,
    // private moduleRef: ModuleRef,
  ) {}

  // declare usersService for moduleRef resolution
  // private usersService: UsersService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // resolve usersService using moduleRef to avoid reflector getting undefined due to usersService being request scoped
    // const contextId = ContextIdFactory.getByRequest(request);
    // this.moduleRef.registerRequestByContextId(request, contextId);
    // this.usersService = await this.moduleRef.resolve(UsersService, contextId);

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('User is not authenticated');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      // Fetch the user from the database using the user ID from the JWT payload
      const user = await this.usersService.findOne(payload.sub);
      // Remove the password from the user object
      delete user.password;
      // Assign the user to the request object
      request['user'] = user;
    } catch {
      throw new UnauthorizedException('User is not authenticated');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
