import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    example: 'Example Title',
    description: 'Title of article',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly title: string;

  @ApiProperty({
    example: 'Body exmaple ...',
    description: 'Main part of article',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly body: string;
}
