import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RequestsContractsService } from './requests-contract.service';
import { CreateRequestsContractDto } from './dto/create-requests-contract.dto';
import { UpdateRequestsContractDto } from './dto/update-requests-contract.dto'; 
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('requests-contract')
export class RequestsContractController {
  constructor(private readonly requestsContractService: RequestsContractsService) {}

  @Public()
  @ResponseMessage("Create renew request!")
  @Post()
  create(@Body() createRequestsContractDto: CreateRequestsContractDto, @User() user: IUser) {
    return this.requestsContractService.create(createRequestsContractDto, user);
  }

  @Get()
  @ResponseMessage("Fetch renew request with paginate!")
  findAll(
    @Query('currentPage') currentPage: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string
  ) {
    return this.requestsContractService.findAll(+currentPage, +pageSize, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch a renew request!")
  findOne(@Param('id') id: string) {
    return this.requestsContractService.findOneByIdContract(id);
  }

  @ResponseMessage("Update renew request!")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestsContractDto: UpdateRequestsContractDto, @User() user: IUser) {
    return this.requestsContractService.update(id, updateRequestsContractDto, user);
  }

  @ResponseMessage("Soft-delete renew request!")
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.requestsContractService.remove(id, user);
  }
}
