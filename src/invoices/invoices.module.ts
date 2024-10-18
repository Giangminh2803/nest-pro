import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice, InvoiceSchema } from './schemas/invoice.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from 'src/services/services.service';
import { ServicesModule } from 'src/services/services.module';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    ServicesModule

  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule { }
