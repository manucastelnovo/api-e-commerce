import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomerOperations1739685126043 implements MigrationInterface {
    name = 'CustomerOperations1739685126043';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`spouse\` (\`id\` int NOT NULL AUTO_INCREMENT, \`full_name\` varchar(255) NOT NULL, \`profession\` varchar(255) NULL, \`job_address\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`departament\` varchar(255) NULL, \`city\` varchar(255) NULL, \`neighborhood\` varchar(255) NULL, \`address\` varchar(255) NULL, \`reference\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`customer_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`eban_customer_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ruc\` varchar(255) NULL, \`category\` varchar(10) NULL, \`delay_days\` int NULL, \`current_debt\` int NULL, \`score_informconf\` varchar(10) NULL, \`delinquent_status\` varchar(50) NULL, \`activity\` varchar(255) NULL, \`family_earning\` int NULL, \`current_cuota\` int NULL, \`external_cuota\` int NULL, \`new_cuota\` int NULL, \`score_indebtedness\` float NULL, \`score_indebtedness_total\` float NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`customer_id\` int NULL, \`operation_charges_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`dni\` int NOT NULL, \`eban_external_id\` int NULL, \`efacil_external_id\` int NULL, \`gonza_external_id\` int NULL, \`gender\` enum ('MASCULINO', 'FEMENINO') NULL, \`marital_status\` varchar(50) NULL, \`birth_date\` date NULL, \`phone_number\` varchar(255) NULL, \`nationality\` varchar(255) NULL, \`email\` varchar(255) NULL, \`children\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`spouse_id\` int NULL, UNIQUE INDEX \`IDX_379e00d128aa2a5da2514e7a6f\` (\`dni\`), UNIQUE INDEX \`REL_c5ece1803bcd8e178e4b18b73a\` (\`spouse_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operation_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NULL, \`comment\` text NOT NULL, \`user\` varchar(255) NULL, \`date\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`operation_charge_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operation_documents\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_id\` int NULL, \`operation_document_type_id\` int NULL, UNIQUE INDEX \`REL_ee7361ef4b35edcd834c187d69\` (\`file_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operation_documents_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`document_type\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`operation_charge_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operation_informconf\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NULL, \`verification_time\` int NULL, \`qualification\` varchar(5) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operation_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`external_item_id\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`unit_price\` int NOT NULL, \`cuota_price\` int NOT NULL, \`total_price\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`operation_charge_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operation_job_reference\` (\`id\` int NOT NULL AUTO_INCREMENT, \`profession\` varchar(255) NULL, \`activity\` varchar(255) NULL, \`employer\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`time_number\` int NULL, \`time_type\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`operation_charge_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operations_result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`result\` varchar(255) NOT NULL, \`reject_reason\` longtext NULL, \`date\` datetime NOT NULL, \`user\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operation_charges\` (\`id\` int NOT NULL AUTO_INCREMENT, \`external_id\` varchar(255) NOT NULL, \`origin\` enum ('EBAN', 'EFACIL', 'GONZALITO') NOT NULL, \`seller\` varchar(255) NULL, \`warehouse\` varchar(255) NULL, \`assigned_user\` varchar(255) NULL, \`operation_total\` int NULL, \`type\` varchar(255) NULL, \`reference_status\` varchar(255) NULL, \`reference_verification\` varchar(255) NULL, \`customer_contacted\` varchar(255) NULL, \`operation_status\` varchar(255) NULL, \`invoice_number\` varchar(255) NULL, \`customer_category\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`customer_id\` int NULL, \`operation_result_id\` int NULL, \`inforconf_data_id\` int NULL, UNIQUE INDEX \`REL_b26170f23d62384c6dbb807a7a\` (\`operation_result_id\`), UNIQUE INDEX \`REL_81b1c3b008dd00d656dad98b16\` (\`inforconf_data_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`operation_personal_reference\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`relation\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`operation_charge_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_7482082bf53fd0ba88a32e3de88\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`eban_customer_status\` ADD CONSTRAINT \`FK_1ce0c793350f3e96b4b957f9954\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`eban_customer_status\` ADD CONSTRAINT \`FK_95bb499988199f8ef110c7a5668\` FOREIGN KEY (\`operation_charges_id\`) REFERENCES \`operation_charges\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`customers\` ADD CONSTRAINT \`FK_c5ece1803bcd8e178e4b18b73ac\` FOREIGN KEY (\`spouse_id\`) REFERENCES \`spouse\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_comments\` ADD CONSTRAINT \`FK_c6d7ff10e8a8d15f434599398cf\` FOREIGN KEY (\`operation_charge_id\`) REFERENCES \`operation_charges\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_documents\` ADD CONSTRAINT \`FK_ee7361ef4b35edcd834c187d697\` FOREIGN KEY (\`file_id\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_documents\` ADD CONSTRAINT \`FK_ac7abe5888cbf07b80ddad1a343\` FOREIGN KEY (\`operation_document_type_id\`) REFERENCES \`operation_documents_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_documents_type\` ADD CONSTRAINT \`FK_477c91c78f564a40978b0483ae3\` FOREIGN KEY (\`operation_charge_id\`) REFERENCES \`operation_charges\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_items\` ADD CONSTRAINT \`FK_6a42e38dac3e49f97350932847d\` FOREIGN KEY (\`operation_charge_id\`) REFERENCES \`operation_charges\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_job_reference\` ADD CONSTRAINT \`FK_d0289c45ffbedda0fc6fc7eae30\` FOREIGN KEY (\`operation_charge_id\`) REFERENCES \`operation_charges\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_charges\` ADD CONSTRAINT \`FK_fc78769444fec59320130bdd4ad\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_charges\` ADD CONSTRAINT \`FK_b26170f23d62384c6dbb807a7ac\` FOREIGN KEY (\`operation_result_id\`) REFERENCES \`operations_result\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_charges\` ADD CONSTRAINT \`FK_81b1c3b008dd00d656dad98b163\` FOREIGN KEY (\`inforconf_data_id\`) REFERENCES \`operation_informconf\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_personal_reference\` ADD CONSTRAINT \`FK_38c517c3323ddbe80e867440987\` FOREIGN KEY (\`operation_charge_id\`) REFERENCES \`operation_charges\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`operation_personal_reference\` DROP FOREIGN KEY \`FK_38c517c3323ddbe80e867440987\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_charges\` DROP FOREIGN KEY \`FK_81b1c3b008dd00d656dad98b163\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_charges\` DROP FOREIGN KEY \`FK_b26170f23d62384c6dbb807a7ac\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_charges\` DROP FOREIGN KEY \`FK_fc78769444fec59320130bdd4ad\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_job_reference\` DROP FOREIGN KEY \`FK_d0289c45ffbedda0fc6fc7eae30\``,
        );
        await queryRunner.query(`ALTER TABLE \`operation_items\` DROP FOREIGN KEY \`FK_6a42e38dac3e49f97350932847d\``);
        await queryRunner.query(
            `ALTER TABLE \`operation_documents_type\` DROP FOREIGN KEY \`FK_477c91c78f564a40978b0483ae3\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_documents\` DROP FOREIGN KEY \`FK_ac7abe5888cbf07b80ddad1a343\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_documents\` DROP FOREIGN KEY \`FK_ee7361ef4b35edcd834c187d697\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`operation_comments\` DROP FOREIGN KEY \`FK_c6d7ff10e8a8d15f434599398cf\``,
        );
        await queryRunner.query(`ALTER TABLE \`customers\` DROP FOREIGN KEY \`FK_c5ece1803bcd8e178e4b18b73ac\``);
        await queryRunner.query(
            `ALTER TABLE \`eban_customer_status\` DROP FOREIGN KEY \`FK_95bb499988199f8ef110c7a5668\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`eban_customer_status\` DROP FOREIGN KEY \`FK_1ce0c793350f3e96b4b957f9954\``,
        );
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_7482082bf53fd0ba88a32e3de88\``);
        await queryRunner.query(`DROP TABLE \`operation_personal_reference\``);
        await queryRunner.query(`DROP INDEX \`REL_81b1c3b008dd00d656dad98b16\` ON \`operation_charges\``);
        await queryRunner.query(`DROP INDEX \`REL_b26170f23d62384c6dbb807a7a\` ON \`operation_charges\``);
        await queryRunner.query(`DROP TABLE \`operation_charges\``);
        await queryRunner.query(`DROP TABLE \`operations_result\``);
        await queryRunner.query(`DROP TABLE \`operation_job_reference\``);
        await queryRunner.query(`DROP TABLE \`operation_items\``);
        await queryRunner.query(`DROP TABLE \`operation_informconf\``);
        await queryRunner.query(`DROP TABLE \`operation_documents_type\``);
        await queryRunner.query(`DROP INDEX \`REL_ee7361ef4b35edcd834c187d69\` ON \`operation_documents\``);
        await queryRunner.query(`DROP TABLE \`operation_documents\``);
        await queryRunner.query(`DROP TABLE \`operation_comments\``);
        await queryRunner.query(`DROP INDEX \`REL_c5ece1803bcd8e178e4b18b73a\` ON \`customers\``);
        await queryRunner.query(`DROP INDEX \`IDX_379e00d128aa2a5da2514e7a6f\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP TABLE \`eban_customer_status\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
        await queryRunner.query(`DROP TABLE \`spouse\``);
    }
}
