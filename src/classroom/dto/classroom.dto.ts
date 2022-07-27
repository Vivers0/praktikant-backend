import { IsDateString, IsEmail, IsHash, isNotEmpty, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { StudentDto } from "src/student/dto/student.dto";

export class ClassroomDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    ownerID: string;

    @IsNotEmpty()
    code: string;

    @IsDateString()
    createdAt: Date;

    @IsOptional()
    deadlineAt: Date;

    @IsNotEmpty()
    users: StudentDto[];
}