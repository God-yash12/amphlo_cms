import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('PartnerFeature')
export class PartnerFeature {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    featureTitle: string;

    @Column({ type: "longtext" })
    featureDescription: string;

    @OneToOne(() => FileUpload, partnerFeature => partnerFeature.partnerFeatureImage, { nullable: true })
    @JoinColumn({ name: "partnerFeatureImageId" })
    image: FileUpload;

    @Column({type: 'json'})
    feature: { title: string, description: string } [];

}
