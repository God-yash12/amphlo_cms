import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";

@Entity("netherlands")
export class Netherlands {
    @PrimaryGeneratedColumn()
    id: number;



    @Column()
    title: string;

    @Column()
    description: string;

    @OneToOne(() => FileUpload, fileUpload => fileUpload.netherlandsImage, { nullable: true })
    @JoinColumn({ name: 'imageId' })
    image: FileUpload;


    @Column({ type: 'json', nullable: true })
    buttons: {name: string, route: string}[];
}
