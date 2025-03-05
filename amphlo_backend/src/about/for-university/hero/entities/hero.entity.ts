import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('about_hero')
export class AboutHero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subTitle: string;

    @OneToOne(()=> FileUpload, fileupload => fileupload.uniHeroImage, {nullable: true})
    @JoinColumn({name: 'image_id'})
    image: FileUpload;
}
