import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Student, StudentSchema } from 'schemas/student.schema';
import { Teacher, TeacherSchema } from 'schemas/teacher.schema';
import { StudentModule } from 'src/student/student.module';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
        MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
        MulterModule.register({
            dest: './storage'
          })
    ],
    controllers: [TeacherController],
    providers: [TeacherService],
    exports: [TeacherService]
})
export class TeacherModule {}
