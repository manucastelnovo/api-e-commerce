import { Product } from 'src/modules/products/entities/product.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CatalogStatus } from '../catalog-status.enum';
import { Catalog } from './catalogs.entity';

@Entity('product_catalog')
export class ProductCatalog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.productCatalogs)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Catalog, (catalog) => catalog.productCatalogs)
    @JoinColumn({ name: 'catalog_id' })
    catalog: Catalog;

    @Column({
        type: 'enum',
        enum: CatalogStatus,
        default: CatalogStatus.ACTIVE,
    })
    status: CatalogStatus;

    @CreateDateColumn()
    createdAt: Date;
}
