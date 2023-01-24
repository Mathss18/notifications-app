import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674148906713 implements MigrationInterface {
    name = 'default1674148906713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`applications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`webpush\` tinyint NOT NULL, \`email\` tinyint NOT NULL, \`sms\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`applications-configurations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`webpush_website_name\` varchar(255) NULL, \`webpush_website_url\` varchar(255) NULL, \`webpush_website_image\` varchar(255) NULL, \`webpush_permisson_text\` varchar(255) NULL, \`webpush_permisson_allow_button_text\` varchar(30) NULL, \`webpush_permisson_deny_button_text\` varchar(30) NULL, \`webpush_welcome_title\` varchar(255) NULL, \`webpush_welcome_text\` varchar(255) NULL, \`webpush_redirect_url_enabled\` tinyint NOT NULL DEFAULT 0, \`webpush_redirect_url\` varchar(255) NULL, \`email_smtp\` varchar(255) NULL, \`email_port\` varchar(255) NULL, \`email_login\` varchar(255) NULL, \`email_password\` varchar(255) NULL, \`email_sender_name\` varchar(255) NULL, \`email_sender_email\` varchar(255) NULL, \`email_template\` text NULL, \`sms_provider\` varchar(255) NULL, \`sms_login\` varchar(255) NULL, \`sms_password\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`application_id\` int NULL, UNIQUE INDEX \`REL_227577d913ce5aa44fd0007efa\` (\`application_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`webpush-audience\` (\`id\` int NOT NULL AUTO_INCREMENT, \`json\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`application_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD CONSTRAINT \`FK_9e7594d5b474d9cbebba15c1ae7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`applications-configurations\` ADD CONSTRAINT \`FK_227577d913ce5aa44fd0007efa5\` FOREIGN KEY (\`application_id\`) REFERENCES \`applications\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`webpush-audience\` ADD CONSTRAINT \`FK_bc0bd8aa147e9df4bd910ecf732\` FOREIGN KEY (\`application_id\`) REFERENCES \`applications\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`webpush-audience\` DROP FOREIGN KEY \`FK_bc0bd8aa147e9df4bd910ecf732\``);
        await queryRunner.query(`ALTER TABLE \`applications-configurations\` DROP FOREIGN KEY \`FK_227577d913ce5aa44fd0007efa5\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP FOREIGN KEY \`FK_9e7594d5b474d9cbebba15c1ae7\``);
        await queryRunner.query(`DROP TABLE \`webpush-audience\``);
        await queryRunner.query(`DROP INDEX \`REL_227577d913ce5aa44fd0007efa\` ON \`applications-configurations\``);
        await queryRunner.query(`DROP TABLE \`applications-configurations\``);
        await queryRunner.query(`DROP TABLE \`applications\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
