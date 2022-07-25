import {Injectable, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import { User } from '../users.entity';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, } from 'class-validator';


@ValidatorConstraint({name: 'isPhoneNumberAlreadyExist', async: true})
@Injectable()
export class isPhoneNumberAlreadyExist implements ValidatorConstraintInterface {
    constructor(
        @Inject('USERS_REPOSITORY')
            protected readonly usersRepository: Repository<User>
    ){}
    async validate(phone_number: string) {
        const user = await this.usersRepository.findOne({
            where:{
                phone_number,
            },
        });
        return user == null ? true : false;
    }
}
export function isPhoneNumberAlreadyExistValidator (validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isPhoneNumberAlreadyExist,
        });
    };
}

