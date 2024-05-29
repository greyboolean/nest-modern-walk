import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: { firstname: string; lastname: string };

  @ApiProperty()
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: { lat: string; long: string };
  };

  @ApiProperty()
  phone: string;

  @ApiProperty()
  roles: Role[];
}
