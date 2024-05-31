import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: { firstname: string; lastname: string };

  @ApiProperty()
  @IsNotEmpty()
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: { lat: string; long: string };
  };

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty()
  roles?: Role[];
}
