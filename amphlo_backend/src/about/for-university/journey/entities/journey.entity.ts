import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("journey")
export class Journey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'json' })
    @ValidateNested({ each: true })
    @Type(() => CardDetail)
    cardDetail: { count: number, cardTitle: string, cardDescription: string }[];

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            cardDetail: this.cardDetail
        };
    }

}

class CardDetail {
    @Column()
    count: number;

    @Column()
    cardTitle: string;

    @Column()
    cardDescription: string;
}
