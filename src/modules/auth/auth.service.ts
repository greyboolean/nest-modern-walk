import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
// import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(logInDto: LogInDto) {
    const { username, password } = logInDto;
    const user = await this.usersService.findOneByUsername(username);
    if (!user || !(await this.valiatePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  async signUp(signUpDto: SignUpDto, tenantId: string) {
    const { username } = signUpDto;
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      throw new UnauthorizedException('Username already exists');
    }
    const newUser = await this.usersService.create(signUpDto, tenantId);
    return this.generateToken(newUser);
  }

  async valiatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  // TODO specify user type by modifiyng schema to match user entity
  async generateToken(user) {
    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
