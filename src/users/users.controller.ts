import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "./users.entity";
import { UsersService } from "./users.service";
import {AuthService} from "../auth/auth.service"

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService:AuthService 
        ) {}

    @Get('')
    getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }
    @Post()
    create(@Body() users: User) {
        return this.usersService.createUsers(users);
    }
    // @Post(':id')
    // remove(@Param('id')id: string){
    // //     return this.usersService.removeUsers(+id);
    // }
    @Post('emailValidate')
    emailValidate(@Body() tokenBody: Object){
        const x = this.usersService.validateUserEmail(tokenBody["token"]);
        return x;
    }
}
