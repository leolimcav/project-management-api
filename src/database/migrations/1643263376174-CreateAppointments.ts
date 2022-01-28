import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1643263376174 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "appointments",
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
            name: "date",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "administrator_id",
            type: "varchar",
            isNullable: false
          },
          {
            name: "meeting_id",
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
            name: "appointments_administrators_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            columnNames: ["meeting_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "meetings",
            name: "appointments_meetings_fk",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("appointments", "appointments_administrators_fk");
      await queryRunner.dropForeignKey("appointments", "appointments_meetings_fk");
      await queryRunner.dropTable("appointments");
    }

}
