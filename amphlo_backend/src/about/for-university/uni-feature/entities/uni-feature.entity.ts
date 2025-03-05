import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("universityFeature")
export class UniFeature {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()       
    title: string;

    @Column()
    description: string;
  static image: any;
}
