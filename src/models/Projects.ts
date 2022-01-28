import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import Administrator from "./Administrator";
import Partner from "./Partner";
import Student from "./Student";

@Entity("projects")
export default class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  field: string;

  @ManyToOne(() => Administrator)
  @JoinColumn({ name: "administrator_id" })
  administrator: Administrator

  @ManyToOne(() => Student)
  @JoinColumn({ name: "student_id" })
  student: Student

  @ManyToOne(() => Partner)
  @JoinColumn({ name: "partner_id" })
  partner: Partner

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
