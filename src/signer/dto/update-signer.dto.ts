import { PartialType } from '@nestjs/swagger';
import { CreateSignerDto } from './create-signer.dto';

export class UpdateSignerDto extends PartialType(CreateSignerDto) {}
