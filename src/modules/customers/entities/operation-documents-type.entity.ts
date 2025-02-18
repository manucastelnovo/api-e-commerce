import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { OperationCharges } from './operation-charges.entity';
import { OperationDocuments } from './operation-documents.entity';

@Entity()
export class OperationDocumentsType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    documentType: string;

    @ManyToOne(() => OperationCharges, (operationCharge) => operationCharge.operationDocumentsType)
    operationCharge: OperationCharges;

    @OneToMany(() => OperationDocuments, (operationDocument) => operationDocument.operationDocumentType, {
        eager: true,
    })
    operationDocuments: OperationDocuments[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
