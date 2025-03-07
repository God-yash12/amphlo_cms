import { IsNotEmpty } from "class-validator";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from "typeorm";

@Entity('UniFeatureCard')
export class FeatureCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column({ type:'longtext', nullable: true})
    @IsNotEmpty()
    description: string;

    @OneToOne(() => FileUpload, fileUpload => fileUpload.uniFeatureCardImage, { nullable: true })
    @JoinColumn({ name: 'featureCardImgId' })
    image: FileUpload
}
