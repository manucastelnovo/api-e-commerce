import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationDto } from '../common/dtos/pagination.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-sub-categories.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { UpdateSubcategoryDto } from './dtos/update-sub-categories.dto';
import { Subcategories } from './entities';
import { Categories } from './entities/categories.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Categories> {
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Get()
    async getAllCategories(@Query() paginationDto: PaginationDto): Promise<Categories[]> {
        return await this.categoriesService.getAllCategories(paginationDto);
    }

    @Get(':id')
    async getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Categories> {
        const category = await this.categoriesService.getSubcategoryByCategoryId(id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    @Patch(':id')
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<Categories> {
        return await this.categoriesService.updateCategory(id, updateCategoryDto);
    }

    @Delete(':id')
    async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.categoriesService.deleteCategory(id);
    }

    @Get(':id/subcategories')
    async getSubcategoriesByCategoryId(@Param('id', ParseIntPipe) id: number): Promise<Subcategories[]> {
        return await this.categoriesService.getSubcategoriesByCategoryId(id);
    }

    @Post(':id/subcategories')
    async createSubcategory(
        @Param('id', ParseIntPipe) categoryId: number,
        @Body() createSubcategoryDto: CreateSubcategoryDto,
    ): Promise<Subcategories> {
        return await this.categoriesService.createSubcategory(categoryId, createSubcategoryDto);
    }

    @Patch('subcategories/:id')
    async updateSubcategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSubcategoryDto: UpdateSubcategoryDto,
    ): Promise<Subcategories> {
        return await this.categoriesService.updateSubcategory(id, updateSubcategoryDto);
    }

    @Delete('subcategories/:id')
    async deleteSubcategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.categoriesService.deleteSubcategory(id);
    }

    @Get('subcategories')
    async getAllSubcategories(@Query() paginationDto: PaginationDto): Promise<Subcategories[]> {
        return await this.categoriesService.getAllSubcategories(paginationDto);
    }

    @Get('subcategories/:id')
    async getSubcategoryById(@Param('id', ParseIntPipe) id: number): Promise<Subcategories> {
        const subcategory = await this.categoriesService.getSubcategoryById(id);
        if (!subcategory) {
            throw new NotFoundException('Subcategory not found');
        }
        return subcategory;
    }
}
