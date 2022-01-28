import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import Partner from "../models/Partner";
import Student from "../models/Student";
import Administrator from "./Administrator";

@Entity("meetings")
export default class Meeting {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  status: string;

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
