import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Contact')
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    email: string;  

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    agency: string;

    @Column({ type: "text"})
    message: string;
    
}
