import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { unlink, unlinkSync } from "fs";
import { Model } from "mongoose";
import { Student } from "schemas/student.schema";
import { StudentDto } from "./dto/student.dto";

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private userModel: Model<Student>) {}

    async create(student: StudentDto) {
        const isNotEmpty = Object.values(student).every(Boolean);
        if (isNotEmpty) {
            const hasDB = await this.userModel.findOne({ email: student.email });
            if (!hasDB) {
                return await new this.userModel(student).save();
            }
            return null;
        }
        return null;
    }

    async find(email: string): Promise<StudentDto> {
        return this.userModel.findOne({ email });
    }

    async updateAvatar(user: string, avatar: Express.Multer.File) {
        // delete 
        const u = await this.userModel.findOne({ email: user });
        if (u.avatar !== null) {
            unlink(`./storage/${u.avatar}.png`, () => {});
        }

        // update
        const avatarName = avatar.filename.split('.')[0];
        const updated = await this.userModel.updateOne({ email: user }, { avatar: avatarName });
        if (updated) {
            return await this.userModel.findOne({ email: user });
        }
    }
}