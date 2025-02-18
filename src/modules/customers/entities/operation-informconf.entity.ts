import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OperationInformconf extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'datetime' })
    date: Date;

    @Column({ nullable: true })
    verificationTime: number;

    @Column({ nullable: true, length: 5 })
    qualification: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
