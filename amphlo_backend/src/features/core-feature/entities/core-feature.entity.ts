import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('CoreFeature')
export class CoreFeature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type:'longtext', nullable: false})
    description: string;

    @Column({ nullable: true })
    mainTitle: string;
}
