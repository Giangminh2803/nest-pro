import { IsBoolean, IsBooleanString, IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import mongoose from "mongoose";

export class CreateRequestsContractDto {
    @IsNotEmpty({message:'Contract is not empty'})
    contract: [mongoose.Schema.Types.ObjectId];

    @IsNotEmpty()
    @IsOptional()
    status: string

    @IsNotEmpty()
    @IsOptional()
    description: string

    @IsOptional()
    type: boolean

    @IsNumber()
    @IsOptional()
    amount: number;
}
