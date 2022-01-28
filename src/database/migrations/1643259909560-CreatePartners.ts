import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePartners1643259909560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "partners",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "255",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
            isUnique: true,
            isNullable: false,
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
            isNullable: false
          },
          {
            name: "administrator_id",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "company_id",
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
          },
        ],
        foreignKeys: [
          {
            columnNames: ["administrator_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "administrators",
            name: "partners_administrators_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            columnNames: ["company_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
            name: "partners_companies_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("partners", "partners_administrators_fk");
      await queryRunner.dropForeignKey("partners", "partners_companies_fk");
      await queryRunner.dropTable("partners");
    }

}
