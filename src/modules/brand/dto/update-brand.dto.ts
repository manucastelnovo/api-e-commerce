import { IsEnum, IsOptional, IsString } from 'class-validator';

import { BrandStatus } from '../brand-status.enum';

export class UpdateBrandDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(BrandStatus)
    @IsOptional()
    status?: BrandStatus;
}
