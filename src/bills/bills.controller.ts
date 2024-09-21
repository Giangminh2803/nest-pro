import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { IUser } from 'src/users/user.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @ResponseMessage('Create a Bill!')
  @Post()
  create(@Body() createBillDto: CreateBillDto, @User() user: IUser) {
    return this.billsService.create(createBillDto, user);
  }

  @ResponseMessage('Fetch data Bill with paginate!')
  @Get()
  findAll(
    @Query('currentPage') currentPage: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string
  ) {
    return this.billsService.findAll(+currentPage, +pageSize, qs);
  }

  @ResponseMessage('Fetch data Bill with userId!')
  @Get('/by-user')
  findOne(@User() user: IUser) {
    return this.billsService.findOne(user._id);
  }

  @ResponseMessage('Update a Bill!')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto, @User() user: IUser) {
    return this.billsService.update(id, updateBillDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.billsService.remove(id, user);
  }
}
