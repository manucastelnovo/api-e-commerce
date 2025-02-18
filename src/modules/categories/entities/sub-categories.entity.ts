import { Product } from 'src/modules/products/entities/product.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CategoryStatus } from '../enums/category-status.enum';
import { Categories } from './categories.entity';

@Entity()
export class Subcategories extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', default: '' })
    name: string;

    @Column({
        enum: CategoryStatus,
        name: 'status',
        default: CategoryStatus.ACTIVE,
        type: 'enum',
    })
    status: CategoryStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Categories, (category) => category.subcategories)
    category: Categories;

    @OneToMany(() => Product, (products) => products.subCategory, { cascade: true })
    product: Product[];
}
