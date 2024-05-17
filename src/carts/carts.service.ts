import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private apiservice: ApiService) {}

  create(createCartDto: CreateCartDto) {
    return this.apiservice.createCart(createCartDto);
  }

  findAll(limit?: string, sort?: string, startDate?: string, endDate?: string) {
    return this.apiservice.findCarts(limit, sort, startDate, endDate);
  }

  findOne(id: number) {
    return this.apiservice.findCart(id);
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.apiservice.updateCart(id, updateCartDto);
  }

  remove(id: number) {
    return this.apiservice.removeCart(id);
  }

  findCartsByUser(id: number) {
    return this.apiservice.findCartsByUser(id);
  }
}
