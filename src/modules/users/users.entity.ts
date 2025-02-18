import * as bcrypt from 'bcryptjs';
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

import { Catalog } from '../catalogs/entities/catalogs.entity';
import { Files } from '../files/files.entity';
import { UserStatus } from './user-status.enum';
import { UserRoles } from './users-roles.enum';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ name: 'slug' })
    slug: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password', select: false })
    password: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({
        enum: UserRoles,
        name: 'role',
        default: UserRoles.VENDEDOR,
        type: 'enum',
    })
    role: UserRoles;

    @Column({
        enum: UserStatus,
        name: 'status',
        default: UserStatus.ACTIVE,
        type: 'enum',
    })
    status: UserStatus;

    @OneToOne(() => Catalog, { nullable: true, eager: true })
    @JoinColumn({ name: 'catalog_id' })
    catalog: Catalog;

    @OneToOne(() => Files, { nullable: true, eager: true })
    @JoinColumn({ name: 'profile_id' })
    profile: Files;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
    deletedAt: Date;

    @BeforeInsert()
    setFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

    @BeforeInsert()
    setSlug() {
        this.slug = ` ${this.firstName}-${this.lastName}`;
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @BeforeInsert()
    async createCatalog() {
        if (!this.catalog) {
            this.catalog = Catalog.create();
            await this.catalog.save();
        }
    }

    @BeforeInsert()
    async createProfile() {
        if (!this.profile) {
            this.profile = Files.create();
            await this.profile.save();
        }
    }

    async validatePassword(password: string, currentPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, currentPassword);
    }
}
