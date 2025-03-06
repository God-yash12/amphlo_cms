import { FileUpload } from "src/file-upload/entities/file-upload.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("universityFeature")
export class UniFeature {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  title: string;

  @Column()
  description: string;
  
  @OneToOne(() => FileUpload, fileUpload => fileUpload.featureImageId, {nullable: true})
  @JoinColumn({name: "imageId"})
  image: FileUpload;
}
