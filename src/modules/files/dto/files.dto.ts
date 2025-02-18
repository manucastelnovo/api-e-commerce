import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilesDto {
    @IsNotEmpty()
    @IsString()
    url: string;

    @IsOptional()
    @IsString()
    fileType: string;
}
