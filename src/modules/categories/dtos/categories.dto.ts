import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { CategoryStatus } from '../enums/category-status.enum';

export class CategoriesDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(CategoryStatus)
    status: CategoryStatus;
}
