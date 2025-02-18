import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../products/entities/product.entity';
import { CatalogStatus } from './catalog-status.enum';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { GetProductsFilterDto } from './dto/read-product-filter.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog } from './entities/catalogs.entity';
import { ProductCatalog } from './entities/catalogs-products.entity';

@Injectable()
export class CatalogsService {
    constructor(
        @InjectRepository(Catalog)
        private readonly catalogRepository: Repository<Catalog>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductCatalog)
        private readonly productCatalogRepository: Repository<ProductCatalog>,
    ) {}

    async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
        const catalog = this.catalogRepository.create({
            ...createCatalogDto,
            status: CatalogStatus.ACTIVE,
        });
        return await this.catalogRepository.save(catalog);
    }

    async findAll(): Promise<Catalog[]> {
        return await this.catalogRepository.find({ relations: ['products'] });
    }

    async findOne(id: number): Promise<Catalog> {
        const catalog = await this.catalogRepository.findOne({ where: { id }, relations: ['products'] });
        if (!catalog) {
            throw new NotFoundException(`Catalog with ID ${id} not found`);
        }
        return catalog;
    }

    async update(id: number, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
        const catalog = await this.findOne(id);
        Object.assign(catalog, updateCatalogDto);
        return await this.catalogRepository.save(catalog);
    }

    async remove(id: number): Promise<void> {
        const catalog = await this.findOne(id);
        await this.catalogRepository.softRemove(catalog);
    }

    async addProductToCatalog(productId: number, catalogId: number, status: CatalogStatus) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        const catalog = await this.catalogRepository.findOne({ where: { id: catalogId } });
        if (!catalog) {
            throw new NotFoundException(`Catalog with ID ${catalogId} not found`);
        }

        const productCatalog = new ProductCatalog();
        productCatalog.product = product;
        productCatalog.catalog = catalog;
        productCatalog.status = status;

        await productCatalog.save();
        return { message: `Product ${productId} has been added to catalog ${catalogId}` };
    }

    async removeProductFromCatalog(catalogId: number, productId: number) {
        const productCatalog = await this.productCatalogRepository.findOne({
            where: { catalog: { id: catalogId }, product: { id: productId } },
        });
        if (!productCatalog) {
            throw new NotFoundException(`Product with ID ${productId} is not found in catalog with ID ${catalogId}`);
        }
        await this.productCatalogRepository.remove(productCatalog);
        return { message: `Product ${productId} removed from catalog ${catalogId}` };
    }

    async getProductsByCatalog(catalogId: number, filterDto: GetProductsFilterDto) {
        const { name, categoryId, limit, page } = filterDto;

        const catalog = await this.catalogRepository.findOne({ where: { id: catalogId } });
        if (!catalog) {
            throw new NotFoundException(`Catalog with ID ${catalogId} not found`);
        }

        const query = this.productCatalogRepository
            .createQueryBuilder('productCatalog')
            .innerJoinAndSelect('productCatalog.product', 'product')
            .where('productCatalog.catalog_id = :catalogId', { catalogId });

        if (name) {
            query.andWhere('product.name LIKE :name', { name: `%${name}%` });
        }

        if (categoryId) {
            query.andWhere('product.category_id = :categoryId', { categoryId });
        }

        const [products, total] = await query
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return {
            total,
            page,
            limit,
            products,
        };
    }
}
