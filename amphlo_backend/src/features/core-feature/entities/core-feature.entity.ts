import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('CoreFeature')
export class CoreFeature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string

    @Column({ nullable: true })
    mainTitle: string;
}
