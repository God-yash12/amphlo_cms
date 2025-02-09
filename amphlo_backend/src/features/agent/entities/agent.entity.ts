import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('agentProcess')
export class Agent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'json', nullable: true })
    process: { processNumber: number, processTitle: string, processDescription: string }[];
}
    