import { ApiProperty } from '@nestjs/swagger';
import { Role, User as UserModel } from '@prisma/tenant-client';
// import { Role } from '../enums/role.enum';
import { Exclude } from 'class-transformer';

export class User implements UserModel {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @Exclude()
  password: string;

  @ApiProperty()
  name: {
    id: number;
    firstname: string;
    lastname: string;
  };

  @Exclude()
  nameId: number;

  @ApiProperty()
  address: {
    id: number;
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      id: number;
      lat: string;
      long: string;
    };
    geolocationId: number;
  };

  @Exclude()
  addressId: number;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  roles: Role[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  tenantId: string;
}
