import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { Bill, BillSchema } from './schemas/bill.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from 'src/services/services.service';
import { ServicesModule } from 'src/services/services.module';

@Module({
  
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
    ServicesModule
  
  ],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
