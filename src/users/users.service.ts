import { ConsoleLogger, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { validate } from "class-validator";

@Injectable()
export class UsersService {

    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: Repository<Users>,
    ) {}

    async getAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }
   
    async createUsers(user: Users) {
        const newUser = this.usersRepository.create(user);
        const errors = await validate(newUser);
        if (errors.length > 0) {
            console.log('getting errors',errors);
            return errors;
        } 
        console.log('getting here');
        return this.usersRepository.save(user);
        
    } 
}
