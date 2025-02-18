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

import { CatalogStatus } from '../catalog-status.enum';
import { ProductCatalog } from './catalogs-products.entity';

@Entity()
export class Catalog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        enum: CatalogStatus,
        name: 'status',
        default: CatalogStatus.ACTIVE,
        type: 'enum',
    })
    status: CatalogStatus;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => ProductCatalog, (productCatalog) => productCatalog.catalog)
    productCatalogs: ProductCatalog[];
}
