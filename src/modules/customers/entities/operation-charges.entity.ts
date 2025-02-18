import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { OperationChargeOrigin } from '../enums/operation-charge-origin.enum';
import { Customers } from './customers.entity';
import { EbanCustomerStatus } from './eban-customers-status.entity';
import { OperationComments } from './operation-comments.entity';
import { OperationDocumentsType } from './operation-documents-type.entity';
import { OperationInformconf } from './operation-informconf.entity';
import { OperationItems } from './operation-items.entity';
import { OperationJobReference } from './operation-job-reference.entity';
import { OperationPersonalReference } from './operation-personal-reference.entity';
import { OperationsResult } from './operations-result.entity';

@Entity()
export class OperationCharges extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalId: string;

    @Column({ enum: OperationChargeOrigin, type: 'enum' })
    origin: OperationChargeOrigin;

    @Column({ nullable: true })
    seller: string;

    @Column({ nullable: true })
    warehouse: string;

    @Column({ nullable: true })
    assignedUser: string;

    @Column({ nullable: true })
    operationTotal: number;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    referenceStatus: string;

    @Column({ nullable: true })
    referenceVerification: string;

    @Column({ nullable: true })
    customerContacted: string;

    @Column({ nullable: true })
    operationStatus: string;

    @Column({ nullable: true })
    invoiceNumber: string;

    @Column({ nullable: true })
    customerCategory: string;

    @ManyToOne(() => Customers, (customers) => customers.operationCharges)
    customer: Customers;

    @OneToOne(() => OperationsResult, { nullable: true, eager: true })
    @JoinColumn()
    operationResult: OperationsResult;

    @OneToMany(() => OperationDocumentsType, (operationDocumentType) => operationDocumentType.operationCharge, {
        eager: true,
    })
    operationDocumentsType: OperationDocumentsType[];

    @OneToMany(() => OperationItems, (operationItems) => operationItems.operationCharge, { eager: true })
    operationItems: OperationItems[];

    @OneToMany(() => OperationPersonalReference, (personalReference) => personalReference.operationCharge, {
        eager: true,
    })
    personalReferences: OperationPersonalReference[];

    @OneToMany(() => OperationJobReference, (jobReference) => jobReference.operationCharge, { eager: true })
    jobReference: OperationJobReference[];

    @OneToMany(() => OperationComments, (operationComments) => operationComments.operationCharge, { eager: true })
    comments: OperationComments[];

    @OneToMany(() => EbanCustomerStatus, (ebanCustomerStatus) => ebanCustomerStatus.operationCharges, { eager: true })
    ebanStatus: EbanCustomerStatus[];

    @OneToOne(() => OperationInformconf, { eager: true })
    @JoinColumn()
    inforconfData: OperationInformconf;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
