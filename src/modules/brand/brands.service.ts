import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from './brand.entity';
import { BrandStatus } from './brand-status.enum';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
    private logger = new Logger('BrandsService');

    constructor(
        @InjectRepository(Brand)
        private brandsRepository: Repository<Brand>,
    ) {}

    async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
        try {
            const { name, status } = createBrandDto;

            const brand = this.brandsRepository.create();
            brand.name = name;

            if (status) {
                brand.status = status;
            }

            return await brand.save();
        } catch (err) {
            this.logger.error('Error al crear una nueva marca', err.stack);
            throw new BadRequestException('Error al crear la marca');
        }
    }

    async getAllBrands(): Promise<Brand[]> {
        try {
            return await this.brandsRepository.find();
        } catch (err) {
            this.logger.error('Error al obtener todas las marcas', err.stack);
            throw new InternalServerErrorException('Error al obtener las marcas');
        }
    }

    async getBrandById(id: number): Promise<Brand> {
        try {
            const brand = await this.brandsRepository.findOneBy({ id });
            if (!brand) {
                throw new NotFoundException('Marca no encontrada');
            }
            return brand;
        } catch (err) {
            this.logger.error(`Error al obtener la marca con ID ${id}`, err.stack);
            throw new InternalServerErrorException('Error al obtener la marca');
        }
    }

    async updateBrand(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
        try {
            const brand = await this.brandsRepository.findOneBy({ id });

            if (!brand) {
                throw new NotFoundException('Marca no encontrada');
            }

            Object.assign(brand, updateBrandDto);

            return await brand.save();
        } catch (err) {
            this.logger.error(`Error al actualizar la marca con ID ${id}`, err.stack);
            throw new InternalServerErrorException('Error al actualizar la marca');
        }
    }

    async deleteBrand(id: number): Promise<void> {
        try {
            const brand = await this.brandsRepository.findOneBy({ id });

            if (!brand) {
                throw new NotFoundException('Marca no encontrada');
            }

            await this.brandsRepository.softDelete({ id });
        } catch (err) {
            this.logger.error(`Error al eliminar la marca con ID ${id}`, err.stack);
            throw new InternalServerErrorException('Error al eliminar la marca');
        }
    }
}
