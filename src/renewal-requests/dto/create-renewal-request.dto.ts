import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import mongoose from "mongoose";

export class CreateRenewalRequestDto {
    @IsNotEmpty({message:'Contract is not empty'})
    contract: [mongoose.Schema.Types.ObjectId];

    @IsNotEmpty({message:'User is not empty'})
    user: [mongoose.Schema.Types.ObjectId];

    @IsNotEmpty()
    @IsOptional()
    status: string


}
