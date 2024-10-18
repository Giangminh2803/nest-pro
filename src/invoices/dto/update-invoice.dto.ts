import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends OmitType(CreateInvoiceDto, ['roomId', 'tenantId', 'serviceId'] as const) { }