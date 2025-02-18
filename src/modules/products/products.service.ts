import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/modules/brand/brand.entity';
import { Categories, Subcategories } from 'src/modules/categories/entities';
import { PaginationDto } from 'src/modules/common/dtos/pagination.dto';
import { Files } from 'src/modules/files/files.entity';
import { FilesRepository } from 'src/modules/files/files.repository';
import { In, Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    private logger = new Logger('ProductService');
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,

        @InjectRepository(Files)
        private filesRepository: FilesRepository,

        @InjectRepository(Categories)
        private categoriesRepository: Repository<Categories>,

        @InjectRepository(Subcategories)
        private subcategoriesRepository: Repository<Subcategories>,

        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,
    ) {}

    async create(createProductDto: CreateProductDto) {
        const {
            name,
            shortDescription,
            longDescription,
            price,
            discountPrice,
            brandId,
            categoryId,
            subCategoryId,
            fileIds,
        } = createProductDto;

        const newProduct = new Product();
        newProduct.name = name;
        newProduct.shortDescription = shortDescription;
        newProduct.longDescription = longDescription;
        newProduct.price = price;
        newProduct.discountPrice = discountPrice;

        if (brandId) {
            const brand = await this.brandRepository.findOneBy({ id: brandId });
            if (!brand) {
                throw new NotFoundException(`Brand with ID ${brandId} not found`);
            }
            newProduct.brand = brand;
        }

        if (categoryId) {
            const category = await this.categoriesRepository.findOneBy({ id: categoryId });
            if (!category) {
                throw new NotFoundException(`Category with ID ${categoryId} not found`);
            }
            newProduct.category = category;
        }

        if (subCategoryId) {
            const subCategory = await this.subcategoriesRepository.findOneBy({ id: subCategoryId });
            if (!subCategory) {
                throw new NotFoundException(`Subcategory with ID ${subCategoryId} not found`);
            }
            newProduct.subCategory = subCategory;
        }

        if (fileIds && fileIds.length > 0) {
            const files = await this.filesRepository.findBy({
                id: In(fileIds),
            });
            if (files.length !== fileIds.length) {
                throw new NotFoundException('One or more files not found');
            }
            newProduct.files = files;
        }

        try {
            const product = await this.productsRepository.save(newProduct);
            return product;
        } catch (error) {
            this.logger.error('Error creating product', error.stack);
            throw new InternalServerErrorException('Error creating product');
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<Product[]> {
        try {
            const { limit = 10, offset = 0 } = paginationDto;
            return await this.productsRepository.find({
                take: limit,
                skip: offset,
            });
        } catch (error) {
            this.logger.error('Error getting products', error.stack);
            throw new InternalServerErrorException('Error getting products');
        }
    }

    async findOne(id: number): Promise<Product> {
        try {
            const product = await this.productsRepository.findOne({
                where: { id },
                relations: ['files', 'brand', 'category', 'subCategory'],
            });
            if (!product) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }
            return product;
        } catch (error) {
            this.logger.error(`Error finding product with ID ${id}`, error.stack);
            throw new InternalServerErrorException('Error finding product');
        }
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        const { brandId, categoryId, subCategoryId, fileIds, ...restOfDto } = updateProductDto;
        this.productsRepository.merge(product, restOfDto);
        if (brandId) {
            const brand = await this.brandRepository.findOneBy({ id: brandId });
            if (!brand) {
                throw new NotFoundException(`Brand with ID ${brandId} not found`);
            }
            product.brand = brand;
        }
        if (categoryId) {
            const category = await this.categoriesRepository.findOneBy({ id: categoryId });
            if (!category) {
                throw new NotFoundException(`Category with ID ${categoryId} not found`);
            }
            product.category = category;
        }
        if (subCategoryId) {
            const subCategory = await this.subcategoriesRepository.findOneBy({ id: subCategoryId });
            if (!subCategory) {
                throw new NotFoundException(`Subcategory with ID ${subCategoryId} not found`);
            }
            product.subCategory = subCategory;
        }
        if (fileIds && fileIds.length > 0) {
            const files = await this.filesRepository.findBy({
                id: In(fileIds),
            });
            if (files.length !== fileIds.length) {
                throw new NotFoundException('One or more files not found');
            }
            product.files = files;
        }
        try {
            return await this.productsRepository.save(product);
        } catch (error) {
            this.logger.error(`Error updating product with ID ${id}`, error.stack);
            throw new InternalServerErrorException('Error updating product');
        }
    }

    async remove(id: number): Promise<{ message: string }> {
        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException('Error getting product');
        }
        try {
            await this.productsRepository.softDelete(id);
            return { message: `Product with ID ${id} removed successfully` };
        } catch (error) {
            this.logger.error(`Error removing product with ID ${id}`, error.stack);
            throw new InternalServerErrorException('Error removing product');
        }
    }
}
