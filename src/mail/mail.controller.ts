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

    const userRole = await this.roleModel.findOne({ name: USER_ROLE });
    const users = await this.userModel.find({ role: userRole?._id }).select('-password');


    for (const user of users) {
      const id = user._id;
      
      const invoiceWithUserId = await this.invoiceModel.find({tenantId: id})
      .populate({path: 'tenantId', select: {name: 1, phone: 1}})
      .populate({path: 'roomId', select: {roomName: 1}})
      .populate({path: 'serviceId', select: {serviceName: 1, unit: 1}})
      ;
     
      if (invoiceWithUserId?.length) {
        let totalMoney: number = 0;
        let bill = invoiceWithUserId.map(item =>{
          
          if (item.status === 'UNPAID') {
            totalMoney += item.amount;
           
          
            return {
              id: item._id.toString(),
              month: item.month, 
              // @ts-ignore: Unreachable code error
              service: item.serviceId.serviceName,
              // @ts-ignore: Unreachable code error
              room: item.roomId?.roomName,
              // @ts-ignore: Unreachable code error
              unit: item.serviceId.unit,
              firstIndex: item?.firstIndex,
              finalIndex: item?.finalIndex,
              price: item.priceUnit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "đ",
              total: item?.totalNumber,
              money: item?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "đ"

            }
          } 
 
        }) 
 
        await this.mailerService.sendMail({
          to: 'dogiang122003@gmail.com',
          from: '"Thông báo hoá đơn" <abc@gmail.com>',
          subject: "Hoá đơn dịch vụ",
          template: 'test',
          context: {
            receiver: user.name,
            bills: bill,
            total: totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " đ"
          }

        })
      
              }
    }

    






  }
} 