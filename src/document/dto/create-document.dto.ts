import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'URL of document',
  })
  @IsNotEmpty()
  @IsString()
  readonly originalDocumentUrl: string;

  @ApiProperty({
    description: 'Name of document',
  })
  @IsNotEmpty()
  @IsString()
  readonly filename: string;

  @ApiProperty({
    description: 'Locations of signature',
  })
  @IsNotEmpty()
  readonly tagSignatureLocations: [String];

  @ApiProperty({
    description: 'Signer details',
  })
  @IsNotEmpty()
  readonly signer: any;
}
