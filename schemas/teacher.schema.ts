import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { Classroom } from "./classroom.schema";
import { Student } from "./student.schema";

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
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

    @Prop({ default: [] })
    classrooms: Classroom[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);