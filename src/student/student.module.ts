import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Student, StudentSchema } from 'schemas/student.schema';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    forwardRef(() => ClassroomModule),
    // forwardRef(() => TeacherModule),
    MulterModule.register({
      dest: './storage'
    })
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule {}
