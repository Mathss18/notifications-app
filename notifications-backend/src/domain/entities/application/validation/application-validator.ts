import {
    IsDate,
    IsOptional,
    MaxLength,
    IsString,
    IsNotEmpty,
    IsBoolean,
    validateSync,
    IsInstance,
    IsNumber,
} from 'class-validator';
import { User } from '../../user/User';
import { IApplication } from '../Application';


export class ApplicationValidator {

    @IsOptional()
    @IsNumber()
    id?: number;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    webpush: boolean;

    @IsBoolean()
    email: boolean

    @IsBoolean()
    sms: boolean

    @IsInstance(User)
    user: User

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    constructor({ id, name, webpush, email, sms, user, createdAt, updatedAt }: IApplication) {
        Object.assign(this, { id, name, webpush, email, sms, user, createdAt, updatedAt });
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