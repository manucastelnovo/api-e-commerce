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
export class OperationsResult extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    result: string;

    @Column({ nullable: true, type: 'longtext' })
    rejectReason: string;

    @Column({ type: 'datetime', nullable: true })
    date: Date;

    @Column({ nullable: true })
    user: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
