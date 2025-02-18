import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { BrandStatus } from '../brand-status.enum';

export class BrandssDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(BrandStatus)
    status: BrandStatus;
}
