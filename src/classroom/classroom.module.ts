import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomService } from './classroom.service';
import { Classroom, ClassroomSchema } from 'schemas/classroom.schema';
import { ClassroomController } from './classroom.controller';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Classroom.name, schema: ClassroomSchema }]),
    forwardRef(() => StudentModule) 
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService],
  exports: [ClassroomService]
})
export class ClassroomModule {}
