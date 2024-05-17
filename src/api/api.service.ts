import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { CreateCartDto } from 'src/carts/dto/create-cart.dto';
import { UpdateCartDto } from 'src/carts/dto/update-cart.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  // products

  async createProduct(createProductDto: CreateProductDto) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://fakestoreapi.com/products',
        createProductDto,
      ),
    );
    return data;
  }

  async findProducts(limit?: string, sort?: string) {
    const { data } = await firstValueFrom(
      this.httpService.get('https://fakestoreapi.com/products', {
        params: {
          ...(limit && { limit }),
          ...(sort && { sort }),
        },
      }),
    );
    return data;
  }

  async findProduct(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://fakestoreapi.com/products/${id}`),
    );
    return data;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const { data } = await firstValueFrom(
      this.httpService.patch(
        `https://fakestoreapi.com/products/${id}`,
        updateProductDto,
      ),
    );
    return data;
  }

  async removeProduct(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete(`https://fakestoreapi.com/products/${id}`),
    );
    return data;
  }

  async findCategories() {
    const { data } = await firstValueFrom(
      this.httpService.get('https://fakestoreapi.com/products/categories'),
    );
    return data;
  }

  async findProductsByCategory(category: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://fakestoreapi.com/products/category/${category}`,
      ),
    );
    return data;
  }

  // carts

  async createCart(createCartDto: CreateCartDto) {
    const { data } = await firstValueFrom(
      this.httpService.post('https://fakestoreapi.com/carts', createCartDto),
    );
    return data;
  }

  async findCarts(
    limit?: string,
    sort?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const { data } = await firstValueFrom(
      this.httpService.get('https://fakestoreapi.com/carts', {
        params: {
          ...(limit && { limit: limit }),
          ...(sort && { sort }),
          ...(startDate && { startdate: startDate }),
          ...(endDate && { enddate: endDate }),
        },
      }),
    );
    return data;
  }

  async findCart(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://fakestoreapi.com/carts/${id}`),
    );
    return data;
  }

  async updateCart(id: number, updateCartDto: UpdateCartDto) {
    const { data } = await firstValueFrom(
      this.httpService.patch(
        `https://fakestoreapi.com/carts/${id}`,
        updateCartDto,
      ),
    );
    return data;
  }

  async removeCart(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete(`https://fakestoreapi.com/carts/${id}`),
    );
    return data;
  }

  async findCartsByUser(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://fakestoreapi.com/carts/user/${id}`),
    );
    return data;
  }

  // users

  async createUser(createUserDto: CreateUserDto) {
    const { data } = await firstValueFrom(
      this.httpService.post('https://fakestoreapi.com/users', createUserDto),
    );
    return data;
  }

  async findUsers(limit?: string, sort?: string) {
    const { data } = await firstValueFrom(
      this.httpService.get('https://fakestoreapi.com/users', {
        params: {
          ...(limit && { limit }),
          ...(sort && { sort }),
        },
      }),
    );
    return data;
  }

  async findUser(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://fakestoreapi.com/users/${id}`),
    );
    return data;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { data } = await firstValueFrom(
      this.httpService.patch(
        `https://fakestoreapi.com/users/${id}`,
        updateUserDto,
      ),
    );
    return data;
  }

  async removeUser(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete(`https://fakestoreapi.com/users/${id}`),
    );
    return data;
  }

  // auth

  async login(loginDto: any) {
    const { data } = await firstValueFrom(
      this.httpService.post('https://fakestoreapi.com/auth/login', loginDto),
    );
    return data;
  }
}
