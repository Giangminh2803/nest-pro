import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RenewalRequestsService } from './renewal-requests.service';
import { CreateRenewalRequestDto } from './dto/create-renewal-request.dto';
import { UpdateRenewalRequestDto } from './dto/update-renewal-request.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('renewal-requests')
export class RenewalRequestsController {
  constructor(private readonly renewalRequestsService: RenewalRequestsService) {}

  @Public()
  @ResponseMessage("Create renew request!")
  @Post()
  create(@Body() createRenewalRequestDto: CreateRenewalRequestDto, @User() user: IUser) {
    return this.renewalRequestsService.create(createRenewalRequestDto, user);
  }

  @Get()
  @ResponseMessage("Fetch renew request with paginate!")
  findAll(
    @Query('currentPage') currentPage: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string
  ) {
    return this.renewalRequestsService.findAll(+currentPage, +pageSize, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch a renew request!")
  findOne(@Param('id') id: string) {
    return this.renewalRequestsService.findOneByIdContract(id);
  }

  @ResponseMessage("Update renew request!")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRenewalRequestDto: UpdateRenewalRequestDto, @User() user: IUser) {
    return this.renewalRequestsService.update(id, updateRenewalRequestDto, user);
  }

  @ResponseMessage("Soft-delete renew request!")
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.renewalRequestsService.remove(id, user);
  }
}
