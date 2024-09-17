import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>) { }

   async create(createJobDto: CreateJobDto, user: IUser) {
    const newJobs =  await this.jobModel.create({...createJobDto, 
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return {
      _id: newJobs._id,
      createdAt: newJobs.createdAt
    }
  }

  async findAll(currentPage: number, pageSize: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.currentPage;
    delete filter.pageSize;
    const defaultCurrentPage = currentPage ? currentPage : 1;
    const defaultPageSize = pageSize ? pageSize : 5;
    const totalDocument = (await this.jobModel.find(filter)).length;
    let totalPage = Math.ceil(totalDocument / defaultPageSize);
    let skip = (defaultCurrentPage - 1) * defaultPageSize;

    const result = await this.jobModel.find(filter)
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

  async findOne(id: string) {
    return await this.jobModel.findOne({_id: id});
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    return await this.jobModel.updateOne({_id: id}, {
      ...updateJobDto, 
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    }) ;
  }

  async remove(id: string, user: IUser) {
    await this.jobModel.updateOne({_id: id}, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return await this.jobModel.softDelete({_id: id});
  }
}
