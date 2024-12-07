import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Contract, ContractSchema } from 'src/contracts/schemas/contract.schema';
import { RequestsContract, RequestsContractSchema } from './schemas/requests-contract.schema';
import { RequestsContractsService } from './requests-contract.service';
import { RequestsContractController } from './requests-contract.controller';

@Module({
  imports: [
     MongooseModule.forFeature([{ name: RequestsContract.name, schema: RequestsContractSchema },
      { name: Contract.name, schema: ContractSchema },]
     ),
    
    ],
  controllers: [RequestsContractController],
  providers: [RequestsContractsService],
})
export class RequestsContractModule {}
