import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/modules/brand/brand.entity';
import { Categories, Subcategories } from 'src/modules/categories/entities';
import { Files } from 'src/modules/files/files.entity';
import { FilesModule } from 'src/modules/files/files.module';

import { ProductCatalog } from '../catalogs/entities/catalogs-products.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductCatalog, Files, Brand, Categories, Subcategories])],
    exports: [ProductsService],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
