import { PartialType } from '@nestjs/mapped-types/dist';

import { CreateSubcategoryDto } from './create-sub-categories.dto';

export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {}
