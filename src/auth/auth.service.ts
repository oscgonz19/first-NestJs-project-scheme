import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";


@Injectable()
export class AuthService {

    constructor(private jwtService:JwtService,){}
    
        generateJWT(userEmail: string): string {
            const payload = {email: userEmail};
            return this.jwtService.sign(payload);
        }   

    }



