import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSignerDto } from './dto/create-signer.dto';
import { UpdateSignerDto } from './dto/update-signer.dto';
import { SignerService } from './signer.service';

@Controller('api/v1/signers')
@ApiTags('Signer')
export class SignerController {
  constructor(private readonly signerService: SignerService) {}

  @Post()
  create(@Body() createSignerDto: CreateSignerDto) {
    return this.signerService.create(createSignerDto);
  }

  @Get()
  findAll() {
    return this.signerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignerDto: UpdateSignerDto) {
    return this.signerService.update(+id, updateSignerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signerService.remove(+id);
  }
}
