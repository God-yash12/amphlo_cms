import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('whyAmphlo')
export class WhyAmphlo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    mainTitle: string;

    @Column({ type:'longtext', nullable: true})
    description: string;

    @OneToOne(() => FileUpload, imageUpload => imageUpload.whyAmphloImage, { nullable: true })
    @JoinColumn({ name: "whyAmphloImageId" })
    image: FileUpload

    @Column({ type: 'json', nullable: true })
    lists: { listTitle: string}[];
}
