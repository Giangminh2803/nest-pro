import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, Res } from '@nestjs/common';
import { PayService } from './pay.service';
import { CreatePayDto } from './dto/create-pay.dto';
import { UpdatePayDto } from './dto/update-pay.dto';
import PayOS from '@payos/node';
import { Public } from 'src/decorator/customize';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) { }
 
}
