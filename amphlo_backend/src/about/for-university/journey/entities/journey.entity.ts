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
    @Type(() => Array)
    cardDetail: {count: number, cardTitle: string, cardDescription: string}[]; 

}
