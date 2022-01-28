import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMeetings1643261329801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "meetings",
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
            name: "title",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "link",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "administrator_id",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "student_id",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "partner_id",
            type: "varchar",
            length: "255",
            isNullable: false,
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
            name: "meetings_administrators_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            columnNames: ["student_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "students",
            name: "meetings_students_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            columnNames: ["partner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "partners",
            name: "meetings_partners_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("meetings", "meetings_administrators_fk");
      await queryRunner.dropForeignKey("meetings", "meetings_students_fk");
      await queryRunner.dropForeignKey("meetings", "meetings_partners_fk");
      await queryRunner.dropTable("meetings");
    }

}
