import { Injectable } from '@nestjs/common';
import { CreateSignerDto } from './dto/create-signer.dto';
import { UpdateSignerDto } from './dto/update-signer.dto';

@Injectable()
export class SignerService {
  create(createSignerDto: CreateSignerDto) {
    return 'This action adds a new signer';
  }

  findAll() {
    return `This action returns all signer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signer`;
  }

  update(id: number, updateSignerDto: UpdateSignerDto) {
    return `This action updates a #${id} signer`;
  }

  remove(id: number) {
    return `This action removes a #${id} signer`;
  }
}
