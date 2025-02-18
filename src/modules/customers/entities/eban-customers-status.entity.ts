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
import { OperationCharges } from './operation-charges.entity';

@Entity()
export class EbanCustomerStatus extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    ruc: string;

    @Column({ nullable: true, length: 10 })
    category: string;

    @Column({ nullable: true })
    delayDays: number;

    @Column({ nullable: true })
    currentDebt: number;

    @Column({ nullable: true, length: 10 })
    scoreInformconf: string;

    @Column({ nullable: true, length: 50 })
    delinquentStatus: string;

    @Column({ nullable: true })
    activity: string;

    @Column({ nullable: true })
    familyEarning: number;

    @Column({ nullable: true })
    currentCuota: number;

    @Column({ nullable: true })
    externalCuota: number;

    @Column({ nullable: true })
    newCuota: number;

    @Column({ nullable: true, type: 'float' })
    scoreIndebtedness: number;

    @Column({ nullable: true, type: 'float' })
    scoreIndebtednessTotal: number;

    @ManyToOne(() => Customers, (customers) => customers.ebanCustomerStatus)
    customer: Customers;

    @ManyToOne(() => OperationCharges, (operationCharges) => operationCharges.ebanStatus)
    operationCharges: OperationCharges;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
