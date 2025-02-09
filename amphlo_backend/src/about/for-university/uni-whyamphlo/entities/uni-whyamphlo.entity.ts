import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UniWhyamphlo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: "longtext"})
    description: string;

}
