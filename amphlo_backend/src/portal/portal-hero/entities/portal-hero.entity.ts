import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("PortalHero")
export class PortalHero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subTitle: string;

    @OneToOne(() => FileUpload, portalHero => portalHero.portalHeroImage, {nullable: true})
    @JoinColumn({name: "portalHeroImageId"})
    image: FileUpload;
}
