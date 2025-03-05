import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Faqs')
export class Faq {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    question: string;

    @Column({ type: "longtext" })
    answer: string;

}
