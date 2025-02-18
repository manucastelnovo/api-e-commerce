import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    shortDescription: string;

    @IsString()
    @IsNotEmpty()
    longDescription: string;

    @IsOptional()
    @IsNumber()
    categoryId: number;

    @IsOptional()
    @IsNumber()
    subCategoryId: number;

    @IsOptional()
    @IsNumber()
    brandId: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    fileIds: number[];

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    discountPrice: number;
}
