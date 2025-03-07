import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('counters')
export class Counter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type:'longtext', nullable: true})
  description: string;

  @Column()
  countryCount: number;

  @Column()
  countryCountSubTitle: string;

  @Column()
  agentCount: number;

  @Column()
  agentCountSubTitle: string;

  @Column()
  studentsCount: number;

  @Column()
  studentsCountSubTitle: string;

  @Column()
  partnerRatingCount: number;

  @Column()
  partnerRatingSubTitle: string;
}
