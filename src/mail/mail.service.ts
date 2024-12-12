import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import mongoose from 'mongoose';
import { use } from 'passport';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { USER_ROLE } from 'src/databases/sample';
import { Invoice, InvoiceDocument } from 'src/invoices/schemas/invoice.schema';

import { PayService } from 'src/pay/pay.service';
import { Pay, PayDocument } from 'src/pay/schemas/pay.schema';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';
import { Service, ServiceDocument } from 'src/services/schemas/service.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';

const {ObjectId} = mongoose.Types;
@Injectable()
export class MailService {
 
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private mailerService: MailerService,
    private configService: ConfigService,
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Invoice.name)
    private invoiceModel: SoftDeleteModel<InvoiceDocument>,
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) {
    this.addAutoSendInvoice();
   }
   addAutoSendInvoice() {
    const cronExpression = this.configService.get<string>('TIME_SEND_INVOICE');
    const job = new CronJob(cronExpression, async() => {
      
        const userRole = await this.roleModel.findOne({ name: USER_ROLE });
        const users = await this.userModel.find({ role: userRole?._id }).select('-password');
        for (const user of users) {
          
          const invoiceWithUserId = await this.invoiceModel.find({ $or: [
            { "tenant._id": user._id.toString() },
            { "tenant._id": new ObjectId(user._id) }
          ], send: false });
          if (invoiceWithUserId?.length > 0) {
            let totalMoney: number = 0;
            let invoices = invoiceWithUserId.map(item => {
              if (item.status === 'UNPAID') {
                totalMoney += item.amount;
                return {
                  id: item._id,
                  month: item.month,
                  service: item.service.name,
                  room: item.room?.roomName,
                  unit: item.service.unit,
                  firstIndex: item?.firstIndex,
                  finalIndex: item?.finalIndex,
                  price: item.service.priceUnit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "đ",
                  total: item?.totalNumber,
                  money: item?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "đ"
                }
              }
            })
            if (invoices && invoices.length > 0) {
              
    
              for (const invoice of invoices) {
                await this.invoiceModel.updateOne({ _id: invoice.id }, { send: true });
              }
              await this.mailerService.sendMail({
                to: user.email,
                from: '"Invoice notification" <abc@gmail.com>',
                subject: "Service invoice",
                template: 'invoiceT.hbs',
                context: {
                  receiver: user.name,
                  bills: invoices,
                  paymentLink: "paymentLink.checkoutUrl",
                  total: totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " đ"
                }
    
              })
            }
          }
        }
      
    });

    
    this.schedulerRegistry.addCronJob('Auto Send Invoice', job);

   
    job.start();
  }

 
}
