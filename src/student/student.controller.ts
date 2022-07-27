import { Body, Controller, Get, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { atob } from "buffer";
import { diskStorage } from 'multer';
import { Response } from "express";
import { ClassroomService } from "src/classroom/classroom.service";
import { StudentDto } from "./dto/student.dto";
import { StudentService } from "./student.service";
import { readFile } from "fs/promises";
import { readFileSync } from "fs";

const base64Img = require('base64-img');

@Controller('/student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService,
        private readonly classroomService: ClassroomService
        ) { }

    @Get()
    getHello() {
        return 'student';
    }

    @Post('/create')
    async create(@Body() student: StudentDto, @Res() res: Response) {
        const req = await this.studentService.create(student);
        return req 
        ? res.status(201).json(req)
        : res.status(HttpStatus.BAD_REQUEST).send({ message: 'Такой аккаунт уже существует!' });
    }

    @Post('auth')
    async auth(@Body() body: { email: string, password: string}, @Res() res: Response) {
        if (body.email && body.password) {
            const user = await this.studentService.find(atob(body.email));
            if (user) {
                if (atob(body.password) === user.password) {
                    return res.send(user);
                }
                return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Неверный пароль' })
            }
            return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Такой пользователь не зарегестрирован' })
        }
        return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Ошибка! Попробуйте позже' })
    }

    @Get('/find')
    async find(
        @Query('email') email: string,
        @Res() res: Response) {
        const user = await this.studentService.find(atob(email));
        if (user) {
            const classroom = await this.classroomService.findUser(atob(email))
            return res.send({ user, classroom });
        }
        return res.status(HttpStatus.BAD_REQUEST).send({});
    }

    @Post('/updateAvatar')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './storage');
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + '.png')
            }
        })
    }))
    async updateAvatar(
        @Query('email') email: string, 
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        const user = await this.studentService.updateAvatar(atob(email), file);
        if (user) {
            return res.status(HttpStatus.OK).send({ avatar: user.avatar + '.png'});
        }
        return res.status(HttpStatus.BAD_REQUEST).send({});
    }
}