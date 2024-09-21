import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type EquipmentDocument = HydratedDocument<Equipment>;

@Schema({ timestamps: true })
export class Equipment {
  @Prop()
  equipmentName: string;

  @Prop()
  status: string;

  @Prop()
  purchaseDate: Date;

  @Prop()
  price: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
