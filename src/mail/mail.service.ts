import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendNotifySignedDocument(
    user: any,
    signer: any,
    signedDocumentUrl: string,
  ) {
    this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Document Signed!',
      template: './notifySignedDocument', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        fullname: `${user.firstname} ${user.lastname}`,
        signedDocumentUrl,
      },
    });
    this.mailerService.sendMail({
      to: signer.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Document Signed!',
      template: './notifySignedDocument', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        fullname: `${signer.firstname} ${signer.lastname}`,
        signedDocumentUrl,
      },
    });
  }

  async sendNotifyCreatedDocument(user: any) {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'New signing document request!',
      template: './notifyCreatedDocument', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        userFullname: `${user.firstname} ${user.lastname}`,
      },
    });
  }

  async sendSigningLink(
    user: any,
    signer: any,
    documentId: string,
    secret: string,
  ) {
    const signingUrl = `http://localhost:3000/document?id=${documentId}&secret=${secret}`;

    await this.mailerService.sendMail({
      to: signer.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'New signing document request!',
      template: './notifySigningDocument', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        userFullname: `${user.firstname} ${user.lastname}`,
        signerFullname: `${signer.firstname} ${signer.lastname}`,
        signingUrl,
      },
    });
  }
}
