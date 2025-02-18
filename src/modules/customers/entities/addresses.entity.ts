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

import { Customers } from './customers.entity';

@Entity()
export class Addresses extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    departament: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    neighborhood: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    reference: string;

    @ManyToOne(() => Customers, (customers) => customers.addresses)
    customer: Customers;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
