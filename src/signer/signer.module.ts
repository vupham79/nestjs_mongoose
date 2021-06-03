import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignerSchema } from './schemas/signer.schema';
import { SignerController } from './signer.controller';
import { SignerService } from './signer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Signer', schema: SignerSchema }]),
  ],
  controllers: [SignerController],
  providers: [SignerService],
})
export class SignerModule {}
