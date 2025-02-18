import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Files } from '../../files/files.entity';
import { OperationDocumentsType } from './operation-documents-type.entity';

@Entity()
export class OperationDocuments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @OneToOne(() => Files, { eager: true })
    @JoinColumn()
    file: Files;

    @ManyToOne(() => OperationDocumentsType, (operationDocumentType) => operationDocumentType.operationDocuments)
    operationDocumentType: OperationDocumentsType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
