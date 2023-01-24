import {
    IsDate,
    IsOptional,
    MaxLength,
    IsString,
    IsNotEmpty,
    IsBoolean,
    validateSync,
    IsEmail,
    IsNumber,
} from 'class-validator';
import { IUser } from '../User';

export class UserValidator {

    @IsNumber()
    @IsOptional()
    id?:number

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: boolean;

    @IsString()
    @IsNotEmpty()
    password: boolean;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    constructor({ id, name, email, password, createdAt, updatedAt }: IUser) {
        Object.assign(this, { id, name, email, password, createdAt, updatedAt });
    }

    validate() {
        const errors = validateSync(this, { stopAtFirstError: false });
        if (errors.length) {
            for (const error of errors) {
                throw new Error(JSON.stringify(error.constraints))
            }
        }
    }
}