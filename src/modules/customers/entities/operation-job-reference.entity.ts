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
export class OperationJobReference extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    profession: string;

    @Column({ nullable: true })
    activity: string;

    @Column({ nullable: true })
    employer: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    timeNumber: number;

    @Column({ nullable: true })
    timeType: string;

    @ManyToOne(() => OperationCharges, (operationCharge) => operationCharge.jobReference)
    operationCharge: OperationCharges;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
