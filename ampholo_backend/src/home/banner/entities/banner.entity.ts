import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FileUpload } from "src/file-upload/entities/file-upload.entity";

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('json')
  buttons: { name: string; route: string }[];

  @ManyToOne(() => FileUpload)
  @JoinColumn()
  image: FileUpload;
} 