import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('AboutMore')
export class AboutMore {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'date', nullable: true})
    year?: Date

    @OneToOne(() => FileUpload, fileUpload => fileUpload.aboutMoreImage, { cascade: true })
    @JoinColumn({ name: "aboutMoreImageId" })
    image: FileUpload;

}