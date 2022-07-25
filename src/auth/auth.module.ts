import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from "./auth.constants";
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
@Module({
    imports :[
        JwtModule.registerAsync({
            inject:[ConfigService],
                useFactory: (configService: ConfigService) => {
                return{
                    secret:configService.get<string>('JWT_SECRET'),
                    verifyOrSignOptions:{expiresIn:'1h'}
                    };
                }
            }),
        ],
    exports: [AuthService],
    providers:[AuthService],
    controllers: [AuthController],
})

export class AuthModule {}
