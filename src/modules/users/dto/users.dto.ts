import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { UserStatus } from '../user-status.enum';
import { UserRoles } from '../users-roles.enum';

export class UsersDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsEnum(UserStatus)
    status: UserStatus;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(UserRoles)
    role: UserRoles;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UpdateStatusDto {
    @IsEnum(UserStatus)
    status: UserStatus;
}

export class UserSearchCriteriaDto {
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsEnum(UserRoles)
    role: UserRoles;
}
