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

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    deposit: number;

    @Prop()
    monthlyRent: number;

    @Prop()
    terms: string;

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

export const ContractSchema = SchemaFactory.createForClass(Contract);