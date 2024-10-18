import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Invoice, InvoiceDocument } from 'src/invoices/schemas/invoice.schema';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';
import { USER_ROLE } from 'src/databases/sample';
import { Service, ServiceDocument } from 'src/services/schemas/service.schema';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService,
    private mailerService: MailerService,
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Invoice.name)
    private billModel: SoftDeleteModel<InvoiceDocument>,
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,

    @InjectModel(Service.name)
    private serviceModel: SoftDeleteModel<ServiceDocument>
  ) { }


  @Get()
  @Public()
  @ResponseMessage('Test Email')
  async handleTestEmail() {

    const userRole = await this.roleModel.findOne({ name: USER_ROLE });
    const users = await this.userModel.find({ role: userRole?._id }).select('-password');


    for (const user of users) {
      const id = user._id;
      const nameUser = user.name;
      const billWithUserId = await this.billModel.find({ tenantId: id })
      let serviceName: string, unit;
      if (billWithUserId?.length) {
        const bill = billWithUserId.map(item => {

          if (item.status === 'NOT YET PAID') {
            return {

              _id: item._id,
              month: item.month,
              firstIndex: item?.firstIndex,
              finalIndex: item?.finalIndex,
              total: item?.totalNumber,
              money: `${item?.amount}`.replace(/\B(?=(\d{3})+ (?!\d))/g, ',') + "đ"

            }
          }

        })
        await this.mailerService.sendMail({
          to: 'dogiang122003@gmail.com',
          from: '"Hello world" <abc@gmail.com>',
          subject: "Welcome to Nice App",
          template: 'test',
          context: {
            user: nameUser,
            bills: bill,
            service: serviceName
          }

        })
      }
    }

    // const tenant = await this.userModel.findUserByRole({});






  }
}