import { Product } from 'src/modules/products/entities/product.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Files extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', default: '' })
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'text', default: 'image' })
    fileType: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Product, (product) => product.files)
    product: Product;
}
