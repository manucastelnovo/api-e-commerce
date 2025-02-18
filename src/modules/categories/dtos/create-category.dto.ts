import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CategoryStatus } from '../enums/category-status.enum';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(CategoryStatus)
    @IsOptional()
    status?: CategoryStatus;
}
