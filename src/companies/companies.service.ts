import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const isExist = await this.companyModel.findOne({name: createCompanyDto.name});
    if(!isExist){
      return await this.companyModel.create({...createCompanyDto})
    }
    return `Company ${createCompanyDto.name} has existed`;
  }

  findAll() {
    return this.companyModel.find();
  }

  async findOne(id: string) {
    
    return await this.companyModel.findOne({_id: id});
  }

   async update(updateCompanyDto: UpdateCompanyDto) {
    const isExist = await this.companyModel.findOne({name: updateCompanyDto.name});
    if(!isExist){
      return await this.companyModel.updateOne({...updateCompanyDto})
    }
    return `Company ${updateCompanyDto.name} has existed`;
  }

  async remove(id: string) {
    return await this.companyModel.softDelete({_id: id});
  }
}
