import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Gallery')
export class Gallery {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => FileUpload, (fileUpload) => fileUpload.gallery)
    files: FileUpload[];
}
