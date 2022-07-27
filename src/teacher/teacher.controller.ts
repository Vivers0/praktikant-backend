import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService
    ) {};

    @Post('create')
    async create(@Body() teacher: TeacherDto, @Res() res: Response) {
        console.log(teacher)
        const req = await this.teacherService.create(teacher);
        return req 
            ? res.status(201).json(req)
            : res.status(HttpStatus.BAD_REQUEST).send({ message: 'Такой аккаунт уже существует!' });
    }
}
