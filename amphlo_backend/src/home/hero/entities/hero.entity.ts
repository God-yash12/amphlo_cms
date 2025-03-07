import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('hero')
export class Hero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @Column({ type:'longtext', nullable: true})
    description: string;

    @Column({type: 'json',  nullable: true})
    buttons: {name: string, route: string}[];

    @OneToOne(() => FileUpload, fileUpload => fileUpload.heroImage, {nullable: true})
    @JoinColumn({name: 'ImageId'})
    image: FileUpload
}
