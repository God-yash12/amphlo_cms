import { Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('adminSignup')
export class AdminSignup {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    @Exclude()
    password: string;

    @Column({nullable: true})
    otp: string;

    @Column({ type: 'timestamp', nullable: true })
    otpExpire: Date;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }
    
}
