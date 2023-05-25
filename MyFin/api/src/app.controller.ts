import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async sayHello(): Promise<unknown> {
    let message = "";
    message = "Hello, server found!";
    // message = await bcrypt.hash('', 10);
    return { message }
  }
}
