import { PartialType } from '@nestjs/mapped-types';
import { CreateRenewalRequestDto } from './create-renewal-request.dto';

export class UpdateRenewalRequestDto extends PartialType(CreateRenewalRequestDto) {}
