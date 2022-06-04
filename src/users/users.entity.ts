import { IsNotEmpty, IsEmail, IsNumberString, Matches, MinLength} from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { isIdCountryAlreadyExistValidator } from './validators/isIdCountryAlreadyExist';
import { IsEmailAlreadyExist } from './validators/isEmailAlreadyExist';
import { isPhoneNumberAlreadyExistValidator } from './validators/isPhoneNumberAlreadyExist';


@Entity({ name: 'users' })
export class Users {
  @PrimaryColumn()
  id: number;

  @Column({ length: 200 })
  @IsNotEmpty({message:'This field is required',})
  first_name: string;

  @Column('text')
  @IsNotEmpty({message:'This field is required',})
  last_name: string;

  @Column()
  @IsEmail()
  @IsNotEmpty({message:'This field is required',})
  @IsEmailAlreadyExist({
    message: 'Email $value already exists. Choose another email.',
  })
  email: string;

  @Column('int')
  @Matches(/^(\W[0-9][A-Z])|(.[0-9][A-Z]).*\W.*$/, {
    message: 'password should include one special character, the second character must be a number and the third an uppercased letter',
  })
  @MinLength(7, {message: 'The password need seven characters'})
  @IsNotEmpty({message:'This field is required',})
  password: string;

  @Column()
  @IsNotEmpty({message:'This field is required',})
  @isPhoneNumberAlreadyExistValidator({message:'This Phone numbervis already used by other users. Choose another Phone number',
})
  phone_number: string;

  @Column()
  created_date: Date;

  @Column()
  update_date: Date;
  
  @Column('text')
  @IsNotEmpty({message:'This field is required',})
  @IsNumberString()
  @isIdCountryAlreadyExistValidator({message:'this id_country is repeat'})
  id_country: string;
}
