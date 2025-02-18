import { MigrationInterface, QueryRunner } from 'typeorm';

export class fileMigration1727898116311 implements MigrationInterface {
    name = 'fileMigration1727898116311';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL DEFAULT '', \`status\` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`subcategories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL DEFAULT '', \`status\` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` text NOT NULL DEFAULT '', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`file_type\` text NOT NULL DEFAULT 'image', \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL DEFAULT '', \`status\` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`short_description\` varchar(255) NOT NULL, \`long_description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`discount_price\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`category_id\` int NULL, \`sub_category_id\` int NULL, \`brand_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`product_catalog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`product_id\` int NULL, \`catalog_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`catalog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`status\` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'VENDEDOR') NOT NULL DEFAULT 'VENDEDOR', \`status\` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`catalog_id\` int NULL, \`profile_id\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_8c43978bce0d373a21cf00b79f\` (\`catalog_id\`), UNIQUE INDEX \`REL_23371445bd80cb3e413089551b\` (\`profile_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`subcategories\` ADD CONSTRAINT \`FK_f7b015bc580ae5179ba5a4f42ec\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`files\` ADD CONSTRAINT \`FK_e15089eb0cc4f275cf80636be6a\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0dce9bc93c2d2c399982d04bef1\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_bb5914af2b6f5d4e13115cdc07b\` FOREIGN KEY (\`sub_category_id\`) REFERENCES \`subcategories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_2eb5ce4324613b4b457c364f4a2\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`product_catalog\` ADD CONSTRAINT \`FK_e66e53d17a52652ea429b6a2662\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`product_catalog\` ADD CONSTRAINT \`FK_aebfca03e0d87c86bd1e0ea6363\` FOREIGN KEY (\`catalog_id\`) REFERENCES \`catalog\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_8c43978bce0d373a21cf00b79f6\` FOREIGN KEY (\`catalog_id\`) REFERENCES \`catalog\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_23371445bd80cb3e413089551bf\` FOREIGN KEY (\`profile_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_23371445bd80cb3e413089551bf\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_8c43978bce0d373a21cf00b79f6\``);
        await queryRunner.query(`ALTER TABLE \`product_catalog\` DROP FOREIGN KEY \`FK_aebfca03e0d87c86bd1e0ea6363\``);
        await queryRunner.query(`ALTER TABLE \`product_catalog\` DROP FOREIGN KEY \`FK_e66e53d17a52652ea429b6a2662\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_2eb5ce4324613b4b457c364f4a2\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_bb5914af2b6f5d4e13115cdc07b\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0dce9bc93c2d2c399982d04bef1\``);
        await queryRunner.query(`ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_e15089eb0cc4f275cf80636be6a\``);
        await queryRunner.query(`ALTER TABLE \`subcategories\` DROP FOREIGN KEY \`FK_f7b015bc580ae5179ba5a4f42ec\``);
        await queryRunner.query(`DROP INDEX \`REL_23371445bd80cb3e413089551b\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_8c43978bce0d373a21cf00b79f\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`catalog\``);
        await queryRunner.query(`DROP TABLE \`product_catalog\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
        await queryRunner.query(`DROP TABLE \`files\``);
        await queryRunner.query(`DROP TABLE \`subcategories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }
}
