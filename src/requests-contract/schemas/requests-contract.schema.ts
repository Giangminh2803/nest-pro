import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Contract } from 'src/contracts/schemas/contract.schema';
import { User } from 'src/users/schemas/user.schema';

export type RequestsContractDocument = HydratedDocument<RequestsContract>;

@Schema({ timestamps: true })
export class RequestsContract {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Contract.name })
    contract: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: mongoose.Schema.Types.ObjectId;

    @Prop()
    status: string;

    @Prop()
    description: string;

    @Prop()
    type: boolean;

    @Prop()
    amount: number;

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

export const RequestsContractSchema = SchemaFactory.createForClass(RequestsContract);
