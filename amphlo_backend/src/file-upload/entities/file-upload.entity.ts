import { KeyFeatureCard } from 'src/forms/key-feature-card/entities/key-feature-card.entity';
import { Banner } from 'src/home/banner/entities/banner.entity';
import { Hero } from 'src/home/hero/entities/hero.entity';
import { HomeAbout } from 'src/home/home-about/entities/home-about.entity';
import { HomeTransform } from 'src/home/home-transform/entities/home-transform.entity';
import { WhyAmphlo } from 'src/home/why-amphlo/entities/why-amphlo.entity';
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

  // RELATION with home-about section
  @OneToOne(() => HomeAbout, homeAbout => homeAbout.image, { onDelete: 'CASCADE' })
  homeAbout_image: HomeAbout;

  //  relation with Home hero section
  @OneToOne(() => Hero, hero => hero.image, {onDelete: 'CASCADE'})
  heroImage: Hero;

  // relation with why-amphlo section
  @OneToOne(() => WhyAmphlo, whyAmphlo => whyAmphlo.image, {onDelete: 'CASCADE'})
  whyAmphloImage: WhyAmphlo;

  // relation with home banner section
  @OneToOne(() => Banner, banner => banner.image, {onDelete: 'CASCADE'})
  bannerImage: Banner;    

  // relation with home transform section
  @OneToOne(() => HomeTransform, homeTransform => homeTransform.image, {onDelete: 'CASCADE'})
  transformImage: HomeTransform;

  // relation with home key feature card
  @OneToOne(() => KeyFeatureCard, keyfeatureCard => keyfeatureCard.image, {onDelete: 'CASCADE'})
  keyFeatureImage: KeyFeatureCard;
}
