import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { isIdCountryAlreadyExist } from './validators/isIdCountryAlreadyExist';
import { IsEmailAlreadyExistConstrain } from './validators/isEmailAlreadyExist';
import { isPhoneNumberAlreadyExist } from './validators/isPhoneNumberAlreadyExist';
import { BullModule, BullQueueEvents } from '@nestjs/bull';
import { EmailsConsumer } from './emails.consumer';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name : 'emails',
    }),
    JwtModule.registerAsync({
      inject:[ConfigService],
        useFactory: (configService: ConfigService) => {
          return{
              secret:configService.get<string>('JWT_SECRET'),
              verifyOrSignOptions:{
              expiresIn:'1h'
            }
          };
        }
      }),
    AuthModule,
    
  ],
  providers: [
    ...usersProviders,
    UsersService, isIdCountryAlreadyExist, IsEmailAlreadyExistConstrain, isPhoneNumberAlreadyExist, EmailsConsumer,
  
  ],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
