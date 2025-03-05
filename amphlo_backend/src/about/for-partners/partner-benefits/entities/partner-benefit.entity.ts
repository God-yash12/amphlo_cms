import { IsNotEmpty } from "class-validator";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from "typeorm";

@Entity('PartnerBenefit')
export class PartnerBenefit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @OneToOne(() => FileUpload, fileUpload => fileUpload.partnerBenefitImage, { nullable: true })
    @JoinColumn({ name: 'partnerBenefitImageId' })
    image: FileUpload
}
