import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pay, PayDocument } from './schemas/pay.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';

@Injectable()
export class PayService {
  constructor(@InjectModel(Pay.name) private payModel: SoftDeleteModel<PayDocument>,
  ) { }


  async create(createPayDto: CreatePayDto, user: IUser) {
    const isExist = await this.payModel.findOne({
      clientId: createPayDto.clientId,
      apiKey: createPayDto.apiKey,
      checksumKey: createPayDto.checksumKey
    })
    if (isExist) {
      throw new BadRequestException('Payment settings already exist!');
    }
    const configPay = await this.payModel.create(
      {
        ...createPayDto,
        userId: user._id,
        createdBy: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      })

    return {
      _id: configPay._id,
      createdAt: configPay.createdAt
    }
  }

  findAll() {
    return `This action returns all pay`;
  }

  async findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!')
    }

    return await this.payModel.findOne({ _id: id });
  }

  async update(id: string, updatePayDto: UpdatePayDto, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!')
    }
    return await this.payModel.updateOne({ _id: id }, {
      ...updatePayDto,
      updatedBy: {
        _id: user._id,
        name: user.name,
        email: user.email

      }
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid!')
    }
    await this.payModel.updateOne({_id: id}, {deletedBy: {_id: user._id, name: user.name, email: user.email}})
    return await this.payModel.softDelete({_id: id});
  }
}
