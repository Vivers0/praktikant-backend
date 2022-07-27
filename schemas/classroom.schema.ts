import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { Student } from "./student.schema";

export type ClassroomDocument = Classroom & Document;

@Schema()
export class Classroom {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    ownerID: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    deadlineAt: Date;

    @Prop({ default: [] })
    users: Student[];
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);