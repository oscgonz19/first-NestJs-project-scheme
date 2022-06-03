import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { isIdCountryAlreadyExist } from './validators/isIdCountryAlreadyExist';
import { IsEmailAlreadyExistConstrain } from './validators/isEmailAlreadyExist';
import { isPhoneNumberAlreadyExist, isPhoneNumberAlreadyExistValidator } from './validators/isPhoneNumberAlreadyExist';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...usersProviders,
    UsersService, isIdCountryAlreadyExist, IsEmailAlreadyExistConstrain, isPhoneNumberAlreadyExist
  
  ],
  controllers: [UsersController],
})
export class UsersModule {}
