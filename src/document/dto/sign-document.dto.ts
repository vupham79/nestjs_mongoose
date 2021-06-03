import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignDocumentDto {
  @ApiProperty({
    description: 'Id of document',
  })
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @ApiProperty({
    description: 'Secret of document',
  })
  @IsNotEmpty()
  @IsString()
  readonly secret: string;

  @ApiProperty({
    description: 'URL of signed document',
  })
  @IsNotEmpty()
  @IsString()
  readonly signedDocumentUrl: string;
}
