import { MigrationInterface, QueryRunner } from "typeorm";

export class OperationNullables1739687466015 implements MigrationInterface {
    name = 'OperationNullables1739687466015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`operations_result\` CHANGE \`date\` \`date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`operation_comments\` CHANGE \`date\` \`date\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`operation_comments\` CHANGE \`date\` \`date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`operations_result\` CHANGE \`date\` \`date\` datetime NOT NULL`);
    }

}
