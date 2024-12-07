import { Module } from '@nestjs/common';
import { RenewalRequestsService } from './renewal-requests.service';
import { RenewalRequestsController } from './renewal-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RenewalRequest, RenewalRequestSchema } from './schemas/renewal-request.schema';
import { ContractsModule } from 'src/contracts/contracts.module';
import { Contract, ContractSchema } from 'src/contracts/schemas/contract.schema';

@Module({
  imports: [
     MongooseModule.forFeature([{ name: RenewalRequest.name, schema: RenewalRequestSchema },
      { name: Contract.name, schema: ContractSchema },]
     ),
    
    ],
  controllers: [RenewalRequestsController],
  providers: [RenewalRequestsService],
})
export class RenewalRequestsModule {}
