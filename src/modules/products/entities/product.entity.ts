import { IsNotEmpty, IsNumber, isNumber, IsPositive, IsString } from 'class-validator';
import { Brand } from 'src/modules/brand/brand.entity';
import { ProductCatalog } from 'src/modules/catalogs/entities/catalogs-products.entity';
import { Categories, Subcategories } from 'src/modules/categories/entities';
import { Files } from 'src/modules/files/files.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    shortDescription: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    longDescription: string;

    @ManyToOne(() => Categories, (category) => category.product)
    category: Categories;

    @OneToMany(() => Files, (files) => files.product, { cascade: true })
    files: Files[];

    @ManyToOne(() => Subcategories, (subcategory) => subcategory.product)
    subCategory: Subcategories;

    @ManyToOne(() => Brand, (brand) => brand.product)
    brand: Brand;

    @Column()
    @IsNumber()
    @IsPositive()
    price: number;

    @Column()
    @IsNumber()
    @IsPositive()
    discountPrice: number;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => ProductCatalog, (productCatalog) => productCatalog.product)
    productCatalogs: ProductCatalog[];
}
