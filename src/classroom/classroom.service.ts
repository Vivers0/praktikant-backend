import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Classroom } from "schemas/classroom.schema";
import { Student } from "schemas/student.schema";
import { StudentDto } from "src/student/dto/student.dto";

@Injectable()
export class ClassroomService {
    constructor(
        @InjectModel(Classroom.name) private classroomModel: Model<Classroom>
    ) {}

    async create(classroom) {
        const isNotEmpty = Object.values(classroom).every(Boolean);
        if (isNotEmpty) {
            return new this.classroomModel(classroom).save();
        }
        return null;
    }

    async findUser(email: string) {
        return this.classroomModel.findOne({ "users.email": email });
    }

    async addUser(user: StudentDto, code: string) {
        return this.classroomModel.updateOne({ code }, { $push: { users: user}});
    }
}