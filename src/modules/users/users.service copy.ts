import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private apiService: ApiService) {}

  create(createUserDto: CreateUserDto) {
    return this.apiService.createUser(createUserDto);
  }

  findAll(limit?: string, sort?: string) {
    return this.apiService.findUsers(limit, sort);
  }

  findOne(id: number) {
    return this.apiService.findUser(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.apiService.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return this.apiService.removeUser(id);
  }
}
