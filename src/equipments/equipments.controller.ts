import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @ResponseMessage('Create a Equipment!')
  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto, @User() user: IUser)  {
    return this.equipmentsService.create(createEquipmentDto, user);
  }

  @ResponseMessage('Fetch data Equipment with paginate!')
  @Get()
  findAll(
    @Query('currentPage') currentPage: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string
  ) {
    return this.equipmentsService.findAll(+currentPage, +pageSize, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findOne(+id);
  }

  @ResponseMessage('Update a Equipment!')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto, @User() user: IUser) {
    return this.equipmentsService.update(id, updateEquipmentDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.equipmentsService.remove(id, user);
  }
}
