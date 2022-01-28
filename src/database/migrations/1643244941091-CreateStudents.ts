import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStudents1643244941091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "students",
        columns: [
          {
            name: "id",
            type: "varchar",
            default: "uuid_generate_v4()",
            generationStrategy: "uuid",
            isPrimary: true,
            isUnique: true,
            isNullable: false
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
            isNullable: false,
            isUnique: true
          },
          {
            name: "phone_number",
            type: "varchar",
            length: "11",
            isNullable: false,
          },
          {
            name: "administrator_id",
            type: "varchar",
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
        ],
        foreignKeys: [{
          name: "student_administrator_fk",
          columnNames: ["administrator_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "administrators",
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        }]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("students", "student_administrator_fk");
      await queryRunner.dropTable("students");
    }

}
