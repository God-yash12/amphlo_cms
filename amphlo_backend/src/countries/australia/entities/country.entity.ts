import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";

@Entity("countryhero")
export class CountryHero {
    @PrimaryColumn({unique: true})
    countryName: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToOne(() => FileUpload, fileUpload => fileUpload.countryHeroImage, { nullable: true })
    @JoinColumn({ name: 'imageId' })
    image: FileUpload;


    @Column({ type: 'json', nullable: true })
    buttons: {name: string, route: string}[];
}
