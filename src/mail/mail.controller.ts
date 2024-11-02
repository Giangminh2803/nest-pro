import { Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Invoice, InvoiceDocument } from 'src/invoices/schemas/invoice.schema';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';

import { Service, ServiceDocument } from 'src/services/schemas/service.schema';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService,
    private mailerService: MailerService,
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Invoice.name)
    private invoiceModel: SoftDeleteModel<InvoiceDocument>,
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,

    @InjectModel(Service.name)
    private serviceModel: SoftDeleteModel<ServiceDocument>
  ) { }


  @Get()
  @Public()
  @ResponseMessage('Test Email')
  async handleTestEmail() {
    return await this.mailService.handleTestEmail();
  }

  @Post()
  @Public()
  @ResponseMessage('Test Email')
  async handleSendCodeVerifyEmail() {
  
    await this.mailerService.sendMail({
      to: 'dogiang122003@gmail.com',
      from: '"Kích hoạt tài khoản" <abc@gmail.com>',
      subject: "Mã kích hoạt",
      template: 'resetPassword',
      context: {
        receiver: "Giang",
        codeId: "123123213213"
      }

    })
  }
}