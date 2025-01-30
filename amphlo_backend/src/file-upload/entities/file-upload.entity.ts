import { HomeAbout } from 'src/home/home-about/entities/home-about.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class FileUpload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  filename: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mimetype: string;

  @Column()
  url: string

  // RELATION

  @OneToOne(() => HomeAbout, homeAbout => homeAbout.image, { onDelete: 'CASCADE' })
  homeAbout_image: HomeAbout;
}
