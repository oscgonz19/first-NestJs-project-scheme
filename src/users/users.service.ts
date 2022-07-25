import { Inject, Injectable, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { validate } from "class-validator";
import { JwtService } from "@nestjs/jwt";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";


//aqui voy agregar el CRUD de usuarios 
@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: Repository<User>,
        
        @InjectQueue('emails')
        private readonly emailsQueue: Queue,
        private jwtService:JwtService, 
        ){}


    getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
    
    findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({email});
        }

    async createUsers(user: User) {
        const newUser = this.usersRepository.create(user);
        const errors = await validate(newUser);
        if (errors.length == 0) {
            const user = await this.usersRepository.save(newUser);
            this.sendEmail(user);
            
            return user;
        } 
        throw new HttpException(errors, HttpStatus.BAD_REQUEST)
        
    }
    async sendEmail(user: User) {
        const job = await this.emailsQueue.add(
            {
                userEmail: user.email,
            },
        );
            return job;
        }
    async removeUsers(id: number) {
        const deleteUser = await this.usersRepository.delete(id);
        }

        
    async validateUserEmail(token : string){
            try {
                console.log('Token VALIDO')
                const isValid = this.jwtService.verify(token)
                console.log(isValid)
                // console.log(isValid['email']) con este llamo solo el valor con la key
                const email = isValid.email 
                const findUser =   await this.findOneByEmail(email);
                const update  = await this.usersRepository.update(findUser.id, {...findUser, status:"active"})
                    console.log(update,"updateUser")
                //destructurar un objetyo con esos tres puntos 
                    
                    return findUser
            } catch (error) {
                console.log('Token vencido')
                throw new UnauthorizedException()
            }
        }
    };

    
