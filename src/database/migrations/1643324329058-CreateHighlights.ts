import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateHighlights1643324329058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "highlights",
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
            name: "end_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "administrator_id",
            type: "varchar",
            isNullable: false
          },
          {
            name: "project_id",
            type: "varchar",
            isNullable: false
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
            name: "highlights_administrators_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            columnNames: ["project_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "projects",
            name: "highlights_projects_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("highlights", "highlights_administrators_fk");
      await queryRunner.dropForeignKey("highlights", "highlights_projects_fk");
      await queryRunner.dropTable("highlights");
    }

}
