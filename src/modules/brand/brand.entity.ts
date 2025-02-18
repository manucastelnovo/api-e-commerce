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

import { BrandStatus } from './brand-status.enum';

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', default: '' })
    name: string;

    @Column({
        enum: BrandStatus,
        name: 'status',
        default: BrandStatus.ACTIVE,
        type: 'enum',
    })
    status: BrandStatus;
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Product, (products) => products.brand, { cascade: true })
    product: Product[];
}
