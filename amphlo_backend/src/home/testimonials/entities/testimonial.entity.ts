import { timestamp } from "rxjs";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('testimonials')
export class Testimonial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    personName: string

    @Column({ type: 'varchar', length: 100 })
    workPlace: string;

    @Column({ type: 'longtext' })
    feedback: string;

    @Column({ type: 'decimal', precision: 2, scale: 1 })
    ratings: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdDate: Date;

    @OneToOne(() => FileUpload, fileupload => fileupload.testimonialImage, { nullable: true })
    @JoinColumn({ name: "TestmonialImageId" })
    image: FileUpload;

}
