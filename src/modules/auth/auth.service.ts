import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(loginDto: LoginDto) {
    return this.apiService.login(loginDto);
  }
}
