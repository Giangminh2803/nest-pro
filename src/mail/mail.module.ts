import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Invoice, InvoiceSchema } from 'src/invoices/schemas/invoice.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Role, RoleSchema } from 'src/role/schemas/role.schema';
import { Service, ServiceSchema } from 'src/services/schemas/service.schema';

@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (configService: ConfigService) => ({
        // transport: configService.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_AUTH_USER'),
            pass: configService.get<string>('EMAIL_AUTH_PASS'),
          },
        },
        // defaults: {
        //   from: `"No Reply" <${configService.get<string>('MAIL_FROM')}>`,
        // },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Service.name, schema: ServiceSchema },

    ]),


  ],


  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],

})
export class MailModule { }
