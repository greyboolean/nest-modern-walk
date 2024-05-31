import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Request } from 'express';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@Public()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  login(@Body() loginDto: LogInDto) {
    return this.authService.logIn(loginDto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  signup(@Body() signUpDto: SignUpDto, @Req() request: Request) {
    return this.authService.signUp(signUpDto, request.tenant.tenantId);
  }
}
