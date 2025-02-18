import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../products/entities/product.entity';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';
import { Catalog } from './entities/catalogs.entity';
import { ProductCatalog } from './entities/catalogs-products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Catalog, ProductCatalog, Product])],
    controllers: [CatalogsController],
    providers: [CatalogsService],
})
export class CatalogsModule {}
