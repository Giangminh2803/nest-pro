import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room, RoomSchema } from 'src/rooms/schemas/room.schema';
import { User } from 'src/users/schemas/user.schema';

export type ContractDocument = HydratedDocument<Contract>;

@Schema({ timestamps: true })

export class Contract {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name })
    roomId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    tenantId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    innkeeperId: mongoose.Schema.Types.ObjectId;

    @Prop()
    numberPeople: number

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    depositAmount: number;

    @Prop()
    monthlyRent: number;

    @Prop()
    description: string;

    @Prop()
    status: string;


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
        name: string
    };

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        name: string
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        name: string
    };
   

}

export const ContractSchema = SchemaFactory.createForClass(Contract);
