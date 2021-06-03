import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { SignerSchema } from 'src/signer/schemas/signer.schema';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentSchema } from './schemas/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Document', schema: DocumentSchema },
      { name: 'Signer', schema: SignerSchema },
    ]),
    MailModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
