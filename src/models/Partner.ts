import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import Administrator from "./Administrator";
import Company from "./Company";

@Entity("partners")
export default class Partner {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Administrator)
  @JoinColumn({ name: "administrator_id" })
  administrator: Administrator

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_id" })
  company: Company

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
