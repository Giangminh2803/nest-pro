import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Room, RoomSchema } from 'src/rooms/schemas/room.schema';
import { Service, ServiceSchema } from 'src/services/schemas/service.schema';
import { User } from 'src/users/schemas/user.schema';


export type BillDocument = HydratedDocument<Bill>;

@Schema({ timestamps: true })
export class Bill {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name })
    roomId: mongoose.Schema.Types.ObjectId;

    @Prop()
    amount: number;

    @Prop()
    month: number;

    @Prop()
    totalNumber: number;

    @Prop()
    firstIndex: number;

    @Prop()
    finalIndex: number;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop({type:  mongoose.Schema.Types.ObjectId, ref: Service.name})
    serviceId:  mongoose.Schema.Types.ObjectId

    @Prop()
    dueDate: Date;

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

export const BillSchema = SchemaFactory.createForClass(Bill);
