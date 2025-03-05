import { Column, PrimaryColumn, BeforeInsert, Entity } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity('UniversityRegister')
export class University {
    @PrimaryColumn({ unique: true })
    email: string;

    @Column()
    contactPersonName: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    UniversityName: string;

}

