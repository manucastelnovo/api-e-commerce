import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-sub-categories.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { UpdateSubcategoryDto } from './dtos/update-sub-categories.dto';
import { Subcategories } from './entities';
import { Categories } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
    private logger = new Logger('CategoriesService');

    constructor(
        @InjectRepository(Categories)
        private categoriesRepository: Repository<Categories>,
        @InjectRepository(Subcategories)
        private subcategoriesRepository: Repository<Subcategories>,
    ) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Categories> {
        try {
            const category = this.categoriesRepository.create(createCategoryDto);
            await this.categoriesRepository.save(category);
            return category;
        } catch (error) {
            this.logger.error('Error creating category', error.stack);
            throw new InternalServerErrorException('Error creating category');
        }
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Categories> {
        try {
            const category = await this.categoriesRepository.preload({
                id: id,
                ...updateCategoryDto,
            });

            if (!category) {
                throw new NotFoundException('Category not found');
            }
            return this.categoriesRepository.save(category);
        } catch (error) {
            this.logger.error('Error updating category', error.stack);
            throw new InternalServerErrorException('Error updating category');
        }
    }

    async getAllCategories(paginationDto: PaginationDto): Promise<Categories[]> {
        try {
            const { limit = 10, offset = 0 } = paginationDto;
            return await this.categoriesRepository.find({
                take: limit,
                skip: offset,
                // TODO: relaciones
            });
        } catch (error) {
            this.logger.error('Error getting categories', error.stack);
            throw new InternalServerErrorException('Error getting categories');
        }
    }

    async getCategoryById(id: number): Promise<Categories> {
        const category = await this.categoriesRepository.findOneBy({ id });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    async deleteCategory(id: number): Promise<void> {
        const result = await this.categoriesRepository.softDelete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }

    async getSubcategoryByCategoryId(categoryId: number): Promise<Categories> {
        const category = await this.categoriesRepository.findOne({
            where: { id: categoryId },
            relations: ['subcategories'],
        });

        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

        return category;
    }

    async createSubcategory(categoryId: number, createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategories> {
        const { name, status } = createSubcategoryDto;
        const category = await this.categoriesRepository.findOneBy({ id: categoryId });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const subcategory = this.subcategoriesRepository.create({
            name,
            status,
            category,
        });

        return await this.subcategoriesRepository.save(subcategory);
    }

    async updateSubcategory(id: number, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategories> {
        const subcategory = await this.subcategoriesRepository.findOneBy({ id });

        if (!subcategory) {
            throw new NotFoundException('Subcategory not found');
        }

        Object.assign(subcategory, updateSubcategoryDto);
        return await subcategory.save();
    }

    async deleteSubcategory(id: number): Promise<void> {
        const result = await this.subcategoriesRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException('Subcategory not found');
        }
    }

    async getAllSubcategories(paginationDto: PaginationDto): Promise<Subcategories[]> {
        const { limit = 10, offset = 0 } = paginationDto;
        return await this.subcategoriesRepository.find({
            take: limit,
            skip: offset,
        });
    }

    async getSubcategoryById(id: number): Promise<Subcategories> {
        const subcategory = await this.subcategoriesRepository.findOneBy({ id });

        if (!subcategory) {
            throw new NotFoundException('Subcategory not found');
        }

        return subcategory;
    }

    async getSubcategoriesByCategoryId(categoryId: number): Promise<Subcategories[]> {
        const category = await this.categoriesRepository.findOneBy({ id: categoryId });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return await this.subcategoriesRepository.find({ where: { category: { id: categoryId } } });
    }
}
