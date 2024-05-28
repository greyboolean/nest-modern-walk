import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private apiService: ApiService) {}

  create(createCartDto: CreateCartDto) {
    return this.apiService.createCart(createCartDto);
  }

  findAll(limit?: string, sort?: string, startDate?: string, endDate?: string) {
    return this.apiService.findCarts(limit, sort, startDate, endDate);
  }

  findOne(id: number) {
    return this.apiService.findCart(id);
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.apiService.updateCart(id, updateCartDto);
  }

  remove(id: number) {
    return this.apiService.removeCart(id);
  }

  findCartsByUser(id: number) {
    return this.apiService.findCartsByUser(id);
  }
}
