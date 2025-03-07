import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('FeatureHero')
export class FeatureHero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type:'longtext', nullable: true})
    description: string

    @Column({ type: "json", nullable: true })
    buttons: { name: string, route: string }[];

    @OneToOne(() => FileUpload, fileUpload => fileUpload.featureHeroImage, { nullable: true })
    @JoinColumn({ name: 'featureHeroImageId' })
    image: FileUpload
}
