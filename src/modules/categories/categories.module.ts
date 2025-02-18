import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categories, Subcategories } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Categories, Subcategories])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    exports: [CategoriesService],
})
export class CategoriesModule {}
