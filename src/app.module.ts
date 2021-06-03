import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { MailModule } from './mail/mail.module';
import { SignerModule } from './signer/signer.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    UserModule,
    AuthModule,
    DocumentModule,
    SignerModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
