import { PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert, Entity } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity('PartnerRegister')
export class Partner {
    @PrimaryColumn({ unique: true })
    email: string;

    @Column()
    personName: string;

    @Column({unique: true})
    phone: string;

    @Column()
    whatsAppNumber: string;

    @Column()
    country: string;

    @Column()
    companyName: string;

    @Column()
    city: string;

}

