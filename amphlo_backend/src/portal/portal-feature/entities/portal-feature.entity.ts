import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("PortalFeature")
export class PortalFeature {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    mainTitle: string;

    @Column({ type: 'longtext', nullable: false })
    description: string

    @Column({ nullable: false })
    listTitle: string

    @Column({ type: 'json', nullable: false })
    listItem: { list: string }[];

    @OneToOne(() => FileUpload, fileUpload => fileUpload.PortalFeatureImage, { nullable: false })
    @JoinColumn({ name: 'portalfeatureImageId' })
    image: FileUpload

}
