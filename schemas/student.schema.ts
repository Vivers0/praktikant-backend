import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { Classroom } from "./classroom.schema";

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    secondName: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    code: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, type: 'date', default: new Date().toISOString() })
    createdAt: string | Date;

    @Prop({ default: null })
    avatar: string;

}

export const StudentSchema = SchemaFactory.createForClass(Student);