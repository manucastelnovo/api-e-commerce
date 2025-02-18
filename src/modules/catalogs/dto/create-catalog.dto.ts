import { IsEnum } from 'class-validator';
import { CatalogStatus } from 'src/modules/catalogs/catalog-status.enum';
export class CreateCatalogDto {
    @IsEnum(CatalogStatus)
    status: CatalogStatus;
}
