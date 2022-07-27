import { IsDateString, IsEmail, IsHash, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { ClassroomDto } from "src/classroom/dto/classroom.dto";

export class TeacherDto {
    @IsOptional()
    _id: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    secondName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('RU')
    phone: string;

    @IsOptional()
    code: string;

    @IsHash('sha256')
    @IsNotEmpty({ message: 'Пароль является обязательным полем' })
    password: string;

    @IsDateString()
    createdAt: string | Date;

    @IsNotEmpty()
    avatar: string;

    @IsNotEmpty()
    classrooms: ClassroomDto[];
}