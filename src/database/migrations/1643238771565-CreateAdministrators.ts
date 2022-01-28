import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdministrators1643238771565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      await queryRunner.createTable(new Table({
        name: "administrators",
        columns: [
          {
            name: "id",
            type: "varchar",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isUnique: false,
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: true,
            length: "255"
          },
          {
            name: "role",
            type: "varchar",
            length: "50",
            isNullable: false,
            isUnique: false
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("administrators");
    }

}
