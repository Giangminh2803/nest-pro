import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PayDocument = HydratedDocument<Pay>;
export class Pay {
   
}
export const PaySchema = SchemaFactory.createForClass(Pay);
