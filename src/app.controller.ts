import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':filename')
  getImage(@Param('filename') fileName: string, @Res() res: any) {
    res.sendFile(fileName, { root: './storage' })
  }
}
