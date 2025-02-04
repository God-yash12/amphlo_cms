import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";

@Entity('homeBanner')
export class Banner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({type: 'json', nullable: true})
    buttons: {name: string, route: string}[];

    @OneToOne(() => FileUpload, fileUpload => fileUpload.bannerImage, {nullable: true})
    @JoinColumn({name: 'BannerImageId'})
    image: FileUpload
}
