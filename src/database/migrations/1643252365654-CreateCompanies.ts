import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompanies1643252365654 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "companies",
        columns: [
          {
            name: "id",
            type: "varchar",
            default: "uuid_generate_v4()",
            generationStrategy: "uuid",
            isPrimary: true,
            isNullable: false,
            isUnique: true
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isUnique: false,
            isNullable: false
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: true
          },
          {
            name: "phone_number",
            type: "varchar",
            length: "11",
            isNullable: false,
            isUnique: false
          },
          {
            name: "address",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: false
          },
          {
            name: "administrator_id",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
            isUnique: false,
          }
        ],
        foreignKeys: [
          {
            columnNames: ["administrator_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "administrators",
            name: "companies_administrators_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("companies", "companies_administrators_fk");
      await queryRunner.dropTable("companies");
    }

}
