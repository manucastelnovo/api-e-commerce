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
export class OperationPersonalReference extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    relation: string;

    @ManyToOne(() => OperationCharges, (operationCharges) => operationCharges.personalReferences)
    operationCharge: OperationCharges;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
