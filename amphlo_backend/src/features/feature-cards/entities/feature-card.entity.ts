import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('FeatureCard')
export class FeatureCard {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type:'longtext', nullable: true})
    description: string;

    @OneToOne(() => FileUpload, fileUpload => fileUpload.featureCardImage, { nullable: true })
    @JoinColumn({ name: 'featureCardImageId'})
    image: FileUpload
    
}
