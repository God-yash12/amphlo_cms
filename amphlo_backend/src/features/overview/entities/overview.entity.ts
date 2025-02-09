import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Overview')
export class Overview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @OneToMany(() => FileUpload, fileUpload => fileUpload.overviewImage, { cascade: true })
    @JoinColumn({ name: "overViewImageId" })
    images: FileUpload[];
}