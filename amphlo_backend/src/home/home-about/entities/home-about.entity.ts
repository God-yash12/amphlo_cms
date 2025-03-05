import { IsOptional } from "class-validator";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("homeAbout")
export class HomeAbout {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    mainTitle: string;

    @Column({ type:'longtext', nullable: false })
    description: string

    @Column({ nullable: false })
    listTitle: string

    @Column({ type: 'json', nullable: false })
    listItem: { list: string }[];

    @OneToOne(() => FileUpload, fileUpload => fileUpload.homeAboutImage, { nullable: true })
    @JoinColumn({ name: 'homeAboutImageId' })
    image: FileUpload

}
