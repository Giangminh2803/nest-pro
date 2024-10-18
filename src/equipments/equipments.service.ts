import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class EquipmentsService {

  constructor(@InjectModel(Equipment.name) private equipmentModel: SoftDeleteModel<EquipmentDocument>) { }

  async create(createEquipmentDto: CreateEquipmentDto, user: IUser) {
    const isExistName = await this.equipmentModel.findOne({ name: createEquipmentDto.name })
    if (isExistName)
      throw new BadRequestException('Equipment name already existed!');
    const equipment = await this.equipmentModel.create({
      ...createEquipmentDto,
      purchaseDate: new Date,
      createdBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    })
    return {
      _id: equipment._id,
      createdAt: equipment.createdAt
    };
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultCurrentPage = currentPage ? currentPage : 1;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.equipmentModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * pageSize;


    const result = await this.equipmentModel.find(filter)
      .skip(skip)
      .limit(defaultPageSize)
      .sort(sort as any)
      .select(projection)
      .populate(population)
      .exec()

    return {
      meta: {
        currentPage: defaultCurrentPage,
        pageSize: defaultPageSize,
        totalPage: totalPage,
        totalDocument: totalDocument
      },
      result
    }

  }


  async findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!');
    }
    return this.equipmentModel.updateOne({ _id: id }, {
      ...updateEquipmentDto,
      updatedBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!');
    }
    this.equipmentModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
      
    });
    return this.equipmentModel.softDelete({_id: id});
  }
}
