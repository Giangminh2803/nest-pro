import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestsContractDto } from './create-requests-contract.dto';

export class UpdateRequestsContractDto extends PartialType(CreateRequestsContractDto) {}
