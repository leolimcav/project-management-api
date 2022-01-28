import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProjects1643265133810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "projects",
        columns: [
          {
            name: "id",
            type: "varchar",
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
            isNullable: false
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "start_date",
            type: "date",
            isNullable: false
          },
          {
            name: "end_date",
            type: "date",
            isNullable: true
          },
          {
            name: "field",
            type: "varchar",
            isNullable: false
          },
          {
            name: "administrator_id",
            type: "varchar",
            isNullable: false
          },
          {
            name: "student_id",
            type: "varchar",
            isNullable: false
          },
          {
            name: "partner_id",
            type: "varchar",
            isNullable: true
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            columnNames: ["administrator_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "administrators",
            name: "projects_administrators_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            columnNames: ["student_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "students",
            name: "projects_students_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            columnNames: ["partner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            name: "projects_partners_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("projects", "projects_administrators_fk");
      await queryRunner.dropForeignKey("projects", "projects_students_fk");
      await queryRunner.dropForeignKey("projects", "projects_partners_fk");
      await queryRunner.dropTable("projects");
    }

}
