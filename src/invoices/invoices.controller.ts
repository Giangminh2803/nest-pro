import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { IUser } from 'src/users/user.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @ResponseMessage('Create a Invoice!')
  @Post()
  create(@Body() CreateInvoiceDto: CreateInvoiceDto, @User() user: IUser) {
    return this.invoicesService.create(CreateInvoiceDto, user);
  }

  @ResponseMessage('Fetch data Invoice with paginate!')
  @Get()
  findAll(
    @Query('currentPage') currentPage: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string
  ) {
    return this.invoicesService.findAll(+currentPage, +pageSize, qs);
  }

  @ResponseMessage('Fetch data Invoice with userId!')
  @Get('/by-user')
  findOne(@User() user: IUser) {
    return this.invoicesService.findOne(user._id);
  }

  @ResponseMessage('Update a Invoice!')
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateInvoiceDto: UpdateInvoiceDto, @User() user: IUser) {
    return this.invoicesService.update(id, UpdateInvoiceDto, user);
  }

  @ResponseMessage('Soft-delete a Invoice!')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.invoicesService.remove(id, user);
  }
}
