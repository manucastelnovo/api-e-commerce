import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class GetProductsFilterDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    categoryId?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    limit?: number = 10;

    @IsOptional()
    @IsInt()
    @IsPositive()
    page?: number = 1;
}
