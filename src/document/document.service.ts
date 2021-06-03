import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { SignDocumentDto } from './dto/sign-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('Document') private readonly documentModel: Model<any>,
    @InjectModel('Signer') private readonly signerModel: Model<any>,
    private mailService: MailService,
  ) {}

  async create(createDocumentDto: CreateDocumentDto, user: any) {
    let signer = null;
    const foundSigner = await this.findSigner(
      createDocumentDto.signer.email,
      user,
    );
    if (!foundSigner) {
      const signerObj = new this.signerModel({
        ...createDocumentDto.signer,
        user,
      });
      const createdSigner = await this.signerModel.create(signerObj);
      signer = createdSigner;
    } else {
      signer = foundSigner;
    }
    const secret = await bcrypt.hash(createDocumentDto.originalDocumentUrl, 10);
    const document = new this.documentModel({
      ...createDocumentDto,
      signer,
      user,
      secret,
    });
    const createdDocument = await this.documentModel.create(document);
    await this.mailService.sendNotifyCreatedDocument(user);
    await this.mailService.sendSigningLink(
      user,
      signer,
      createdDocument._id,
      secret,
    );
    await this.documentModel.updateOne(
      {
        _id: createdDocument._id,
      },
      {
        isNotifySigner: true,
      },
    );
    return;
  }

  findAll() {
    return `This action returns all document`;
  }

  async findOne(id: string, secret: string) {
    try {
      return await this.documentModel
        .findOne({
          _id: id,
          secret,
          signedAt: null,
        })
        .populate('user signer', '-password');
    } catch (error) {
      return error;
    }
  }

  async signDocument(signDocumentDto: SignDocumentDto) {
    await this.documentModel.findOneAndUpdate(
      {
        _id: signDocumentDto._id,
        secret: signDocumentDto.secret,
      },
      {
        signedDocumentUrl: signDocumentDto.signedDocumentUrl,
        signedAt: Date.now(),
      },
    );
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }

  private findSigner(email, user) {
    return this.signerModel.findOne({
      email,
      user,
    });
  }
}
