import { IsOptional } from "class-validator";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("homeAbout")
export class HomeAbout {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    title: string

    @Column({nullable: false})
    description: string

    @Column({nullable: false})
    listTitle: string

    @Column({nullable: false})
    listItem: string

    @OneToOne(() => FileUpload, fileUpload => fileUpload.homeAbout_image, { nullable: false })
    @JoinColumn({ name: 'imageId' })
    image: FileUpload
    
}
