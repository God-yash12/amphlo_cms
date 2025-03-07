import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('keyFeatureCard')
export class KeyFeatureCard {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type:'longtext', nullable: true})
    description: string;

    @OneToOne(() => FileUpload, fileUpload => fileUpload.keyFeatureImage, { nullable: true })
    @JoinColumn({ name: 'keyFeatureImageId'})
    image: FileUpload
    
}
