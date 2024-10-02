import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/role/schemas/role.schema';
import { Room } from 'src/rooms/schemas/room.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  idCard: number;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Role.name})
    role: mongoose.Schema.Types.ObjectId;

  @Prop()
  address: string;

 
  @Prop()
  refresh_token: string;

  @Prop({ type: [mongoose.Schema.Types.Array], ref: Room.name })
  roomsRented:Room[] ;

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

export const UserSchema = SchemaFactory.createForClass(User);
