import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('keyFeatures')
export class KeyFeature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;
}