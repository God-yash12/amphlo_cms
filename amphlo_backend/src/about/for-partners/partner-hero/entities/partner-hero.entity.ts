import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('PartnerHero')
export class PartnerHero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'json', nullable: true })
    buttons: { name: string, route: string }[];

    @OneToOne(() => FileUpload, fileUpload => fileUpload.partnerHeroImage, { nullable: true })
    @JoinColumn({ name: 'partnerHeroImageId' })
    image: FileUpload;
}
