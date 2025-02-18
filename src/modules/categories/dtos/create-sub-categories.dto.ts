import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoryStatus } from 'src/modules/categories/enums/category-status.enum';

export class CreateSubcategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(CategoryStatus)
    status: CategoryStatus;
}
