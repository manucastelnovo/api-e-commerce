import { Product } from 'src/modules/products/entities/product.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CategoryStatus } from '../enums/category-status.enum';
import { Subcategories } from './sub-categories.entity';

@Entity()
export class Categories extends BaseEntity {
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

    @OneToMany(() => Subcategories, (subcategory) => subcategory.category, { cascade: true })
    subcategories: Subcategories[];

    @OneToMany(() => Product, (products) => products.category, { cascade: true })
    product: Product[];
}
