import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("JoinNow")
export class PartnerJoinnow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'json', nullable: true })
    buttons: { name: string, route: string }[];
}
