import { Body, Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { StudentDto } from "src/student/dto/student.dto";
import { StudentService } from "src/student/student.service";
import { ClassroomService } from "./classroom.service";
import { ClassroomDto } from "./dto/classroom.dto";

@Controller('/classroom')
export class ClassroomController {
    constructor(
        private readonly classroomService: ClassroomService,
        private readonly studentService: StudentService
    ) { }

    @Get()
    getHello() {
        return 'classroom';
    }

    @Post('create')
    async create(@Body() classroom: ClassroomDto) {
        const req = await this.classroomService.create(classroom);
        return req;
    }

    // @Get('/create')
    // async cr() {
    //     const json: ClassroomDto = {
    //         name: 'тестовый класс',
    //         ownerID: '62cda1a50a01da4794b1289d',
    //         code: '123456',
    //         createdAt: new Date(),
    //         deadlineAt: new Date(),
    //         users: []
    //     }
    //     return await this.classroomService.create(json)
    // }

    @Get('/find')
    async findUser(@Query('email') email: string) {
        const user = await this.classroomService.findUser(atob(email));
        return user;
    }

    @Get('/addUser')
    async addUser(
        @Query('email') email: string,
        @Query('code') code: string,
        // @Res() res: Response
    ) {
        const user: StudentDto = await this.studentService.find(atob(email));
        if (user) {
            const req = await this.classroomService.addUser(user, code);
            return req
        }

    }
}