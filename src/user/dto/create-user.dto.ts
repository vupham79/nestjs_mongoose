import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'pejman hadavi',
    description: 'The name of the User',
    format: 'string',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly firstname: string;

  @ApiProperty({
    example: 'pejman hadavi',
    description: 'The name of the User',
    format: 'string',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly lastname: string;

  @ApiProperty({
    example: '0906426802',
    description: 'The phone number of the User',
    format: 'string',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  readonly phoneNumber: string;

  // Email
  @ApiProperty({
    example: 'pejman@gmail.com',
    description: 'The email of the User',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  // Password
  @ApiProperty({
    example: 'secret password change me!',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
}
