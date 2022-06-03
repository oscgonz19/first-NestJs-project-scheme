import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './users/users.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get()
  // newEndpoint(): string {
  //   return this.appService.getHello();

  // }
  @Post()
  create(@Body() users: Users) {
    console.log(users);
  }
  
}


