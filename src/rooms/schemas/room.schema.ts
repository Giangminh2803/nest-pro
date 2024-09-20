import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop()
  roomNumber: string;

  @Prop()
  location: string;

  @Prop()
  area: number;

  @Prop()
  status: string;

  @Prop()
  price: number;

  @Prop({type: mongoose.Schema.Types.ObjectId})
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.Array })
  services: mongoose.Schema.Types.ObjectId[] ;

  @Prop({ type: mongoose.Schema.Types.Array })
  equipments : mongoose.Schema.Types.ObjectId[] ;

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

export const RoomSchema = SchemaFactory.createForClass(Room);
