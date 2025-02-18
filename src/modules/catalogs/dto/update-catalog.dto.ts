import { PartialType } from '@nestjs/mapped-types/dist';

import { CreateCatalogDto } from './create-catalog.dto';

export class UpdateCatalogDto extends PartialType(CreateCatalogDto) {}
