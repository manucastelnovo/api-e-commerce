import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Post()
    async createBrand(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
        return await this.brandsService.createBrand(createBrandDto);
    }

    @Get()
    async getAllBrands(): Promise<Brand[]> {
        return await this.brandsService.getAllBrands();
    }

    @Get(':id')
    async getBrandById(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
        return await this.brandsService.getBrandById(id);
    }

    @Patch(':id')
    async updateBrand(@Param('id', ParseIntPipe) id: number, @Body() updateBrandDto: UpdateBrandDto): Promise<Brand> {
        return await this.brandsService.updateBrand(id, updateBrandDto);
    }

    @Delete(':id')
    async deleteBrand(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.brandsService.deleteBrand(id);
    }
}
