import { Injectable } from '@nestjs/common';
import { LogInDto } from './dto/log-in.dto';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(loginDto: LogInDto) {
    return this.apiService.login(loginDto);
  }
}
