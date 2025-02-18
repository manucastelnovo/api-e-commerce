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
export class OperationComments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    type: string;

    @Column({ type: 'text' })
    comment: string;

    @Column({ nullable: true })
    user: string;

    @Column({ type: 'datetime', nullable: true })
    date: Date;

    @ManyToOne(() => OperationCharges, (operationCharge) => operationCharge.comments)
    operationCharge: OperationCharges;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
