import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import Administrator from "./Administrator";
import Project from "./Projects";

@Entity("highlights")
export default class Highlight {
  @PrimaryColumn()
  id: string;

  @Column()
  end_date: Date;

  @ManyToOne(() => Administrator)
  @JoinColumn({ name: "administrator_id" })
  administrator: Administrator

  @ManyToOne(() => Project)
  @JoinColumn({ name: "project_id" })
  project: Project

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
