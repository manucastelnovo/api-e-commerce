import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

import { CatalogStatus } from './catalog-status.enum';
import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { GetProductsFilterDto } from './dto/read-product-filter.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Controller('catalogs')
export class CatalogsController {
    constructor(private readonly catalogsService: CatalogsService) {}

    @Post()
    create(@Body() createCatalogDto: CreateCatalogDto) {
        return this.catalogsService.create(createCatalogDto);
    }

    @Get()
    findAll() {
        return this.catalogsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCatalogDto: UpdateCatalogDto) {
        return this.catalogsService.update(id, updateCatalogDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.catalogsService.remove(id);
    }

    @Post(':catalogId/products/:productId')
    async addProductToCatalog(
        @Param('productId', ParseIntPipe) productId: number,
        @Param('catalogId', ParseIntPipe) catalogId: number,
        @Body('status') status: CatalogStatus,
    ) {
        return await this.catalogsService.addProductToCatalog(productId, catalogId, status);
    }

    @Delete(':catalogId/products/:productId')
    async removeProductFromCatalog(
        @Param('catalogId', ParseIntPipe) catalogId: number,
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return await this.catalogsService.removeProductFromCatalog(catalogId, productId);
    }

    @Get(':catalogId/products')
    async getProductsByCatalog(
        @Param('catalogId', ParseIntPipe) catalogId: number,
        @Query() filterDto: GetProductsFilterDto,
    ) {
        return await this.catalogsService.getProductsByCatalog(catalogId, filterDto);
    }
}
