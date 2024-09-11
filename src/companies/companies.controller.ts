import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  findAll(
    @Query('currentPage') currentPage: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string

  ) {
    return this.companiesService.findAll(+currentPage, +pageSize, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch()
  update(@Body() updateCompanyDto: UpdateCompanyDto,  @User() user: IUser) {
    return this.companiesService.update(updateCompanyDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
