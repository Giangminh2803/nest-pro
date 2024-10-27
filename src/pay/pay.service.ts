import { Injectable } from '@nestjs/common';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import PayOS from '@payos/node';
import { IPayment } from './IPayment.interface';
import dayjs from 'dayjs';

@Injectable()
export class PayService {
  async handlePayment(payment: IPayment) {
    const payos = new PayOS(
      '0a1cb2f2-420b-4ee3-b0e4-3ffecacdaf79',
      '2cbd5f45-b74e-428f-a37e-acfc271ea01d',
      'a4565674b9aa4c62e629a6ff5b9729019392f4620fab15f99125bddd4f83210a')
    const dates = new Date().getTime();
    const order = {
      amount: payment.amount,
      description: payment.description,
      orderCode: dates,
      expireAt: dayjs().add(10, 'days'),
      returnUrl: 'http://localhost:8000',
      cancelUrl: "http://localhost:8000"
    };
    
     const paymentLink = await payos.createPaymentLink(order);
    return paymentLink;
  }

  findAll() {
    return `This action returns all pay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pay`;
  }

  update(id: number, updatePayDto: UpdatePayDto) {
    return `This action updates a #${id} pay`;
  }

  remove(id: number) {
    return `This action removes a #${id} pay`;
  }
}
