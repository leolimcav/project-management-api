import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import Administrator from "./Administrator";
import Meeting from "./Meeting";

@Entity("appointments")
export default class Appointment {
  @PrimaryColumn()
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => Administrator)
  @JoinColumn({ name: "administrator_id" })
  administrator: Administrator

  @OneToOne(() => Meeting)
  @JoinColumn({ name: "meeting_id" })
  meeting: Meeting

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
