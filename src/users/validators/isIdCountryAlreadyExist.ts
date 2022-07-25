import { ValidatorConstraint,ValidatorConstraintInterface,ValidationOptions,registerDecorator } from 'class-validator';
import {Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users.entity';

@ValidatorConstraint({name: 'isIdCountryAlreadyExist', async: true})
@Injectable()
export class isIdCountryAlreadyExist implements ValidatorConstraintInterface {
    constructor(
        @Inject('USERS_REPOSITORY')
          protected readonly usersRepository: Repository<User>
    ){}
    
    async validate(id_country: string) {
      const user = await this.usersRepository.findOne({
        where: {
          id_country,
        },
    });
      return user === null ? true : false;
    }
  }
  export function isIdCountryAlreadyExistValidator (validationOptions?: ValidationOptions) {
      return function (object: Object, propertyName: string) {
        registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: isIdCountryAlreadyExist,
        });
      };
  }
  