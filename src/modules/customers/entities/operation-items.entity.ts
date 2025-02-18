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

import { OperationCharges } from './operation-charges.entity';

@Entity()
export class OperationItems extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    externalItemId: string;

    @Column()
    name: string;

    @Column()
    unitPrice: number;

    @Column()
    cuotaPrice: number;

    @Column()
    totalPrice: number;

    @ManyToOne(() => OperationCharges, (operationCharges) => operationCharges.operationItems)
    operationCharge: OperationCharges;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
