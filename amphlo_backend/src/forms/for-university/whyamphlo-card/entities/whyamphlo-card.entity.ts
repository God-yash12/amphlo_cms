import { IsNotEmpty } from "class-validator";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from "typeorm";

@Entity('UniWhyAmphloCard')
export class WhyamphloCard {
    @PrimaryGeneratedColumn()
        id: number;
    
        @Column()
        @IsNotEmpty()
        title: string;
    
        @Column({ type:'longtext', nullable: true})
        @IsNotEmpty()
        description: string;
    
        @OneToOne(() => FileUpload, fileUpload => fileUpload.uniWhyAmphloCard, { nullable: true })
        @JoinColumn({ name: 'UniWhyAmphloImageId'})
        image: FileUpload
}
