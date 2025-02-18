import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

import { CustomersGenderEnum } from '../enums/customers-gender.enum';
import { Addresses } from './addresses.entity';
import { EbanCustomerStatus } from './eban-customers-status.entity';
import { OperationCharges } from './operation-charges.entity';
import { Spouse } from './spouse.entity';

@Entity()
@Unique(['dni'])
export class Customers extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    fullName: string;

    @Column({ type: 'int' })
    dni: number;

    @Column({ nullable: true, type: 'int' })
    ebanExternalId: number;

    @Column({ nullable: true, type: 'int' })
    efacilExternalId: number;

    @Column({ nullable: true, type: 'int' })
    gonzaExternalId: number;

    @Column({ nullable: true, type: 'enum', enum: CustomersGenderEnum })
    gender: CustomersGenderEnum;

    @Column({ nullable: true, type: 'varchar', length: 50 })
    maritalStatus: string;

    @Column({ type: 'date', nullable: true })
    birthDate: Date;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    nationality: string;

    @Column({ nullable: true })
    email: string;

    @Column({ default: 0, type: 'int' })
    children: number;

    @OneToMany(() => Addresses, (addresses) => addresses.customer, { eager: true })
    addresses: Addresses[];

    @OneToOne(() => Spouse, { eager: true })
    @JoinColumn()
    spouse: Spouse;

    @OneToMany(() => EbanCustomerStatus, (ebanStatus) => ebanStatus.customer, { eager: true })
    ebanCustomerStatus: EbanCustomerStatus[];

    @OneToMany(() => OperationCharges, (oc) => oc.customer, { eager: true })
    operationCharges: OperationCharges[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    setFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
}
