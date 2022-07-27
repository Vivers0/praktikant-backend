import { Injectable } from '@nestjs/common';
import { Teacher } from 'schemas/teacher.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TeacherDto } from './dto/teacher.dto';
import { Student } from 'schemas/student.schema';

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
        @InjectModel(Student.name) private studentModel: Model<Student>
    ) {}

    async create(teacher: TeacherDto) {
        const isNotEmpty = Object.values(teacher).every(Boolean);
        if (isNotEmpty) {
            const hasTeacherDB = await this.teacherModel.findOne({ email: teacher.email });
            const hasStudentDB = await this.studentModel.findOne({ email: teacher.email });
            if (!hasTeacherDB && !hasStudentDB) {
                return await new this.teacherModel(teacher).save();
            }
            return null;
        }
        return null;
    }
}
