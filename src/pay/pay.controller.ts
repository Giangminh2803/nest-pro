import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, Res } from '@nestjs/common';
import { PayService } from './pay.service';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';

import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) { }

  @ResponseMessage('Create a new config Pay!')
  @Post()
  create(
    @Body() createPayDto: CreatePayDto,
    @User() user: IUser
  ) {
    return this.payService.create(createPayDto, user);
  }



  @ResponseMessage('Fetch data a config Pay!')
  @Get(':id')
  fetchData(
    @Param('id') id: string,

  ) {
    return this.payService.findOne(id);
  }

  @ResponseMessage('Fetch data Pay!')
  @Get()
  fetchDataPayPort() {
    return this.payService.findAll();
  }

  @ResponseMessage('Update a new config Pay!')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @User() user: IUser,
    @Body() updatePayDto: UpdatePayDto
  ) {
    return this.payService.update(id, updatePayDto, user);
  }

  @ResponseMessage('Delete a config Pay!')
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @User() user: IUser,
    
  ) {
    return this.payService.remove(id, user);
  }

  @ResponseMessage('Fetch data Pay!')
  @Post()
  createLinkPayment(
    @Body('idInvoices') idInvoice: string[],
    @Body('idPort') idPort: string
  ) {
    return this.payService.createLinkPayment(idInvoice, idPort);
  }
}
