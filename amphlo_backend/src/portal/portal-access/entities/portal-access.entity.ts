import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('PortalAccess')
export class PortalAccess {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ type:'longtext', nullable: true})
    description: string;

    @Column({ type: 'json', nullable: true })
    process: { processCount: number, processTitle: string, processDescription: string }[];
}
