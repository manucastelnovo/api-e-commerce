import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { BrandStatus } from '../brand-status.enum';

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(BrandStatus)
    status: BrandStatus;
}
