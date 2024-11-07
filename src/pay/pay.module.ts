import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pay, PaySchema } from './schemas/pay.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Pay.name, schema: PaySchema}])],
  controllers: [PayController],
  providers: [PayService],
  exports: [PayService]
})
export class PayModule {}
