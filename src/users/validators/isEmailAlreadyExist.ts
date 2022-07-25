import { ValidatorConstraint,ValidatorConstraintInterface,ValidationOptions,registerDecorator } from 'class-validator';
  import {Injectable, Inject} from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { User } from '../users.entity';

@ValidatorConstraint({ name: 'isEmailAlreadyExist', async: true })
  @Injectable() // this is needed in order to the class be injected into the module
  export class IsEmailAlreadyExistConstrain implements ValidatorConstraintInterface {
      constructor(
        @Inject('USERS_REPOSITORY')
        protected readonly userRepository: Repository<User>
      ) {}
  
      async validate(email: string) {
          const user = await this.userRepository.findOne({
            where: {
              email,
            },
          });
          return !user;
      }
  }
  
  export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailAlreadyExistConstrain,
      });
    };
  }
