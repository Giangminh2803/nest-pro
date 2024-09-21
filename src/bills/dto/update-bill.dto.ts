import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';

export class UpdateBillDto extends OmitType(CreateBillDto, ['roomId', 'userId'] as const) {}
